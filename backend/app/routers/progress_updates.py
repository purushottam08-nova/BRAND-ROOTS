from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin, get_current_user
from app.database import get_db
from app.models.enquiry import Enquiry
from app.models.progress_update import ProgressUpdate
from app.models.user import User


router = APIRouter(
    prefix="/api/v1",
    tags=["Progress Updates"],
)


class ProgressUpdateCreate(BaseModel):
    title: str = Field(min_length=3, max_length=150)
    description: str = Field(min_length=5)
    status: str = "in_progress"


ALLOWED_STATUSES = {
    "pending",
    "in_progress",
    "completed",
}


# OWNER: Add progress update for a client
@router.post(
    "/admin/enquiries/{enquiry_id}/updates",
    status_code=status.HTTP_201_CREATED,
)
def create_progress_update(
    enquiry_id: int,
    update_data: ProgressUpdateCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    if update_data.status not in ALLOWED_STATUSES:
        raise HTTPException(
            status_code=400,
            detail="Invalid progress status",
        )

    enquiry = db.get(Enquiry, enquiry_id)

    if not enquiry:
        raise HTTPException(
            status_code=404,
            detail="Enquiry not found",
        )

    update = ProgressUpdate(
        enquiry_id=enquiry.id,
        title=update_data.title.strip(),
        description=update_data.description.strip(),
        status=update_data.status,
        created_at=datetime.now(timezone.utc),
    )

    db.add(update)
    db.commit()
    db.refresh(update)

    return {
        "message": "Progress update created",
        "id": update.id,
        "enquiry_id": update.enquiry_id,
        "title": update.title,
        "description": update.description,
        "status": update.status,
        "created_at": update.created_at,
    }


# CLIENT: Get only their own progress updates
@router.get("/enquiries/my/updates")
def get_my_progress_updates(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    enquiries = (
        db.query(Enquiry)
        .filter(Enquiry.user_id == current_user.id)
        .all()
    )

    enquiry_ids = [enquiry.id for enquiry in enquiries]

    if not enquiry_ids:
        return []

    updates = (
        db.query(ProgressUpdate)
        .filter(ProgressUpdate.enquiry_id.in_(enquiry_ids))
        .order_by(ProgressUpdate.created_at.desc())
        .all()
    )

    return [
        {
            "id": update.id,
            "enquiry_id": update.enquiry_id,
            "title": update.title,
            "description": update.description,
            "status": update.status,
            "created_at": update.created_at,
        }
        for update in updates
    ]