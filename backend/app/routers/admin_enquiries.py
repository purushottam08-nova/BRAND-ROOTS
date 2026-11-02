from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin
from app.database import get_db
from app.models.enquiry import Enquiry
from app.models.user import User


router = APIRouter(
    prefix="/api/v1/admin/enquiries",
    tags=["Admin Enquiries"],
)


@router.get("/")
def get_all_enquiries(
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    enquiries = (
        db.query(Enquiry)
        .order_by(Enquiry.created_at.desc())
        .all()
    )

    results = []

    for enquiry in enquiries:
        user = db.get(User, enquiry.user_id)

        results.append(
            {
                "id": enquiry.id,
                "user_id": enquiry.user_id,
                "user_name": user.name if user else None,
                "user_email": user.email if user else None,
                "user_phone": user.phone if user else None,
                "service_name": enquiry.service_name,
                "plan_name": enquiry.plan_name,
                "business_name": enquiry.business_name,
                "message": enquiry.message,
                "status": enquiry.status,
                "created_at": enquiry.created_at,
            }
        )

    return results


@router.patch("/{enquiry_id}/status")
def update_enquiry_status(
    enquiry_id: int,
    new_status: str,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    allowed_statuses = {
        "pending",
        "contacted",
        "in_progress",
        "completed",
        "rejected",
    }

    if new_status not in allowed_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid enquiry status",
        )

    enquiry = db.get(Enquiry, enquiry_id)

    if enquiry is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Enquiry not found",
        )

    enquiry.status = new_status

    db.commit()
    db.refresh(enquiry)

    return {
        "message": "Enquiry status updated successfully",
        "enquiry_id": enquiry.id,
        "status": enquiry.status,
    }