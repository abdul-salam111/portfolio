import ssl
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from .config import settings


class Base(DeclarativeBase):
    pass


def _normalise(url: str):
    """Make a provider-issued URL usable by asyncpg.

    Neon/Render hand out `postgresql://...?sslmode=require`. asyncpg speaks a
    different dialect name and rejects libpq-only query params like sslmode and
    channel_binding, so strip them and express TLS as a connect_arg instead.
    """
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)

    connect_args = {}
    if url.startswith("postgresql+asyncpg://"):
        parts = urlsplit(url)
        params = dict(parse_qsl(parts.query))
        libpq_only = {"sslmode", "channel_binding", "options", "target_session_attrs"}
        wants_ssl = params.get("sslmode", "require") != "disable"
        kept = {k: v for k, v in params.items() if k not in libpq_only}
        url = urlunsplit(
            (parts.scheme, parts.netloc, parts.path, urlencode(kept), parts.fragment)
        )
        if wants_ssl:
            # Managed Postgres uses certs from a public CA; verify normally.
            connect_args["ssl"] = ssl.create_default_context()

    return url, connect_args


DATABASE_URL, CONNECT_ARGS = _normalise(settings.database_url)

_engine_kwargs = {"connect_args": CONNECT_ARGS, "echo": False}
if DATABASE_URL.startswith("postgresql"):
    # SQLite runs on NullPool, which rejects these entirely.
    _engine_kwargs.update(
        pool_pre_ping=True,  # Neon drops idle connections; check before handing one out
        pool_size=5,
        max_overflow=5,
    )

engine = create_async_engine(DATABASE_URL, **_engine_kwargs)

SessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_db():
    async with SessionLocal() as session:
        yield session
