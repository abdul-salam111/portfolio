from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .config import settings
from .models import AdminUser
from .security import hash_password


async def ensure_admin_user(db: AsyncSession) -> None:
    """Create the initial admin from env vars if no admin exists yet.

    Only ever runs on an empty table, so redeploys never reset a password the
    owner has since changed via /api/auth/change-password.
    """
    existing = await db.execute(select(AdminUser).limit(1))
    if existing.scalar_one_or_none() is not None:
        return

    db.add(
        AdminUser(
            username=settings.admin_username,
            hashed_password=hash_password(settings.admin_password),
        )
    )
    await db.commit()
