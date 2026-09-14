from datetime import datetime
from typing import List, Optional

from sqlalchemy import Boolean, DateTime, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import JSON

from .database import Base

# JSONB on Postgres, plain JSON elsewhere (e.g. SQLite in local dev).
JSONList = JSON().with_variant(JSONB(), "postgresql")


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )


class AdminUser(Base, TimestampMixin):
    __tablename__ = "admin_users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    username: Mapped[str] = mapped_column(String(80), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)


class Project(Base, TimestampMixin):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    category: Mapped[str] = mapped_column(String(200), default="", nullable=False)
    tagline: Mapped[str] = mapped_column(String(400), default="", nullable=False)
    description: Mapped[str] = mapped_column(Text, default="", nullable=False)
    full_description: Mapped[str] = mapped_column(Text, default="", nullable=False)
    image: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    screenshots: Mapped[List[str]] = mapped_column(JSONList, default=list, nullable=False)
    tech_stack: Mapped[List[str]] = mapped_column(JSONList, default=list, nullable=False)
    features: Mapped[List[str]] = mapped_column(JSONList, default=list, nullable=False)
    play_store_link: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    app_store_link: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    order: Mapped[int] = mapped_column(Integer, default=0, nullable=False, index=True)
    published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)


class Blog(Base, TimestampMixin):
    __tablename__ = "blogs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(300), nullable=False)
    date: Mapped[str] = mapped_column(String(60), default="", nullable=False)
    image: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    category: Mapped[Optional[str]] = mapped_column(String(120), nullable=True)
    excerpt: Mapped[str] = mapped_column(Text, default="", nullable=False)
    content: Mapped[str] = mapped_column(Text, default="", nullable=False)  # HTML from the editor
    read_time: Mapped[Optional[str]] = mapped_column(String(60), nullable=True)
    tags: Mapped[List[str]] = mapped_column(JSONList, default=list, nullable=False)
    comments: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    link: Mapped[str] = mapped_column(Text, default="#!", nullable=False)
    order: Mapped[int] = mapped_column(Integer, default=0, nullable=False, index=True)
    published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)


class Testimonial(Base, TimestampMixin):
    __tablename__ = "testimonials"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    designation: Mapped[str] = mapped_column(String(300), default="", nullable=False)
    message: Mapped[str] = mapped_column(Text, default="", nullable=False)
    quote: Mapped[str] = mapped_column(Text, default="", nullable=False)
    order: Mapped[int] = mapped_column(Integer, default=0, nullable=False, index=True)
    published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)


class Client(Base, TimestampMixin):
    __tablename__ = "clients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    logo: Mapped[str] = mapped_column(Text, default="", nullable=False)
    order: Mapped[int] = mapped_column(Integer, default=0, nullable=False, index=True)
    published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
