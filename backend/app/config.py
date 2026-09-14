from typing import List, Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Postgres. Neon hands out a URL like
    # postgresql://user:pass@host/db?sslmode=require — normalised in database.py.
    database_url: str = "sqlite+aiosqlite:///./local.db"

    # Auth
    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 12

    # Seeded on first boot when the admin table is empty.
    admin_username: str = "admin"
    admin_password: str = "change-me"

    # Comma-separated list of allowed browser origins.
    cors_origins: str = "http://localhost:5173,https://abdul-salam111.github.io"

    # Cloudinary (optional — uploads 503 without it)
    cloudinary_cloud_name: Optional[str] = None
    cloudinary_api_key: Optional[str] = None
    cloudinary_api_secret: Optional[str] = None

    # Drop and recreate tables on boot, then reseed. Never enable in production.
    reset_db_on_boot: bool = False

    @property
    def cors_origin_list(self) -> List[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def cloudinary_configured(self) -> bool:
        return all(
            [
                self.cloudinary_cloud_name,
                self.cloudinary_api_key,
                self.cloudinary_api_secret,
            ]
        )


settings = Settings()
