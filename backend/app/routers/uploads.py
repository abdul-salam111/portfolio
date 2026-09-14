from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

from ..config import settings
from ..deps import get_current_admin
from ..models import AdminUser
from ..schemas import UploadOut

router = APIRouter(prefix="/api/uploads", tags=["uploads"])

MAX_BYTES = 8 * 1024 * 1024  # 8 MB
ALLOWED = {"image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"}


@router.post("/image", response_model=UploadOut, status_code=status.HTTP_201_CREATED)
async def upload_image(
    file: UploadFile = File(...),
    _: AdminUser = Depends(get_current_admin),
):
    if not settings.cloudinary_configured:
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            "Image uploads are not configured. Set CLOUDINARY_CLOUD_NAME, "
            "CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.",
        )

    if file.content_type not in ALLOWED:
        raise HTTPException(
            status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            f"Unsupported type {file.content_type}. Allowed: {', '.join(sorted(ALLOWED))}",
        )

    # UploadFile has no reliable length up front, so read with a cap.
    data = await file.read(MAX_BYTES + 1)
    if len(data) > MAX_BYTES:
        raise HTTPException(
            status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            f"Image exceeds the {MAX_BYTES // (1024 * 1024)}MB limit",
        )
    if not data:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Empty file")

    import cloudinary
    import cloudinary.uploader

    cloudinary.config(
        cloud_name=settings.cloudinary_cloud_name,
        api_key=settings.cloudinary_api_key,
        api_secret=settings.cloudinary_api_secret,
        secure=True,
    )

    try:
        result = cloudinary.uploader.upload(
            data,
            folder="portfolio",
            resource_type="image",
            overwrite=False,
            unique_filename=True,
        )
    except Exception as exc:  # cloudinary raises a wide range of errors
        raise HTTPException(status.HTTP_502_BAD_GATEWAY, f"Upload failed: {exc}")

    return UploadOut(
        url=result["secure_url"],
        public_id=result["public_id"],
        width=result.get("width"),
        height=result.get("height"),
        bytes=result.get("bytes"),
        format=result.get("format"),
    )
