from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..config import settings
from ..database import get_db
from ..deps import get_current_admin
from ..models import AdminUser
from ..schemas import AdminOut, LoginRequest, PasswordChange, Token
from ..security import create_access_token, hash_password, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AdminUser).where(AdminUser.username == payload.username))
    admin = result.scalar_one_or_none()

    # Same error for unknown user and bad password, so the response does not
    # reveal which usernames exist.
    if admin is None or not admin.is_active or not verify_password(payload.password, admin.hashed_password):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Incorrect username or password")

    return Token(
        access_token=create_access_token(admin.username),
        expires_in=settings.access_token_expire_minutes * 60,
    )


@router.get("/me", response_model=AdminOut)
async def me(admin: AdminUser = Depends(get_current_admin)):
    return admin


@router.post("/change-password", status_code=status.HTTP_204_NO_CONTENT)
async def change_password(
    payload: PasswordChange,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin),
):
    if not verify_password(payload.current_password, admin.hashed_password):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Current password is incorrect")
    admin.hashed_password = hash_password(payload.new_password)
    await db.commit()
