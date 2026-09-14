import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import Base, SessionLocal, engine
from .routers import auth, uploads
from .routers.content import blogs_router, clients_router, projects_router, testimonials_router
from .seed import ensure_admin_user

logger = logging.getLogger("uvicorn.error")


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        if settings.reset_db_on_boot:
            logger.warning("RESET_DB_ON_BOOT is set — dropping all tables")
            await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    async with SessionLocal() as db:
        await ensure_admin_user(db)

    if not settings.cloudinary_configured:
        logger.warning("Cloudinary is not configured — image uploads will return 503")

    yield
    await engine.dispose()


app = FastAPI(
    title="Abdul Salam Portfolio API",
    description="Content API for the portfolio site: projects, blogs, testimonials and clients.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=False,  # auth travels in the Authorization header, not cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(uploads.router)
app.include_router(projects_router)
app.include_router(blogs_router)
app.include_router(testimonials_router)
app.include_router(clients_router)


@app.get("/", tags=["meta"])
async def root():
    return {"service": "portfolio-api", "docs": "/docs", "health": "/health"}


@app.get("/health", tags=["meta"])
async def health():
    """Cheap liveness probe — also handy as a keep-alive ping target."""
    return {"status": "ok"}
