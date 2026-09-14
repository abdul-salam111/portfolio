from typing import List, Type

from fastapi import APIRouter, Depends, HTTPException, Response, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .database import Base, get_db
from .deps import get_current_admin
from .models import AdminUser
from .schemas import CamelModel


class ReorderItem(CamelModel):
    id: int
    order: int


def make_crud_router(
    *,
    model: Type[Base],
    create_schema: Type[BaseModel],
    update_schema: Type[BaseModel],
    out_schema: Type[BaseModel],
    prefix: str,
    tag: str,
) -> APIRouter:
    """Build the standard public-read / admin-write router for one resource.

    Public GETs expose only published rows. Drafts are reachable solely through
    the authenticated /admin/all listing, so an unpublished post never leaks.
    """
    router = APIRouter(prefix=prefix, tags=[tag])

    async def _get_or_404(db: AsyncSession, item_id: int):
        obj = await db.get(model, item_id)
        if obj is None:
            raise HTTPException(status.HTTP_404_NOT_FOUND, f"{tag[:-1]} {item_id} not found")
        return obj

    @router.get("", response_model=List[out_schema])
    async def list_public(db: AsyncSession = Depends(get_db)):
        result = await db.execute(
            select(model).where(model.published.is_(True)).order_by(model.order, model.id)
        )
        return result.scalars().all()

    @router.get("/admin/all", response_model=List[out_schema])
    async def list_all(
        db: AsyncSession = Depends(get_db),
        _: AdminUser = Depends(get_current_admin),
    ):
        result = await db.execute(select(model).order_by(model.order, model.id))
        return result.scalars().all()

    @router.post("/reorder", status_code=status.HTTP_204_NO_CONTENT)
    async def reorder(
        items: List[ReorderItem],
        db: AsyncSession = Depends(get_db),
        _: AdminUser = Depends(get_current_admin),
    ):
        for item in items:
            obj = await db.get(model, item.id)
            if obj is not None:
                obj.order = item.order
        await db.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    @router.get("/{item_id}", response_model=out_schema)
    async def get_one(item_id: int, db: AsyncSession = Depends(get_db)):
        obj = await _get_or_404(db, item_id)
        if not obj.published:
            raise HTTPException(status.HTTP_404_NOT_FOUND, f"{tag[:-1]} {item_id} not found")
        return obj

    @router.post("", response_model=out_schema, status_code=status.HTTP_201_CREATED)
    async def create(
        payload: create_schema,
        db: AsyncSession = Depends(get_db),
        _: AdminUser = Depends(get_current_admin),
    ):
        obj = model(**payload.model_dump())
        db.add(obj)
        await db.commit()
        await db.refresh(obj)
        return obj

    @router.put("/{item_id}", response_model=out_schema)
    async def update(
        item_id: int,
        payload: update_schema,
        db: AsyncSession = Depends(get_db),
        _: AdminUser = Depends(get_current_admin),
    ):
        obj = await _get_or_404(db, item_id)
        for field, value in payload.model_dump(exclude_unset=True).items():
            setattr(obj, field, value)
        await db.commit()
        await db.refresh(obj)
        return obj

    @router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
    async def delete(
        item_id: int,
        db: AsyncSession = Depends(get_db),
        _: AdminUser = Depends(get_current_admin),
    ):
        obj = await _get_or_404(db, item_id)
        await db.delete(obj)
        await db.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    return router
