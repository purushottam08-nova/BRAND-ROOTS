
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.database import get_db
from app.models.enquiry import Enquiry
from app.models.user import User
from app.schemas.enquiry import EnquiryCreate, EnquiryResponse

router = APIRouter(
    prefix="/api/v1/enquiries",
    tags=["Enquiries"],
)


@router.post(
    "/",
    response_model=EnquiryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_enquiry(
    enquiry_data: EnquiryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    enquiry = Enquiry(
        user_id=current_user.id,
        service_name=enquiry_data.service_name,
        plan_name=enquiry_data.plan_name,
        business_name=enquiry_data.business_name,
        message=enquiry_data.message,
    )

    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)

    return enquiry


@router.get("/my")
def get_my_enquiries(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    enquiries = (
        db.query(Enquiry)
        .filter(Enquiry.user_id == current_user.id)
        .order_by(Enquiry.created_at.desc())
        .all()
    )

    return [
        {
            "id": item.id,
            "service_name": item.service_name,
            "plan_name": item.plan_name,
            "business_name": item.business_name,
            "message": item.message,
            "status": item.status,
            "created_at": item.created_at,
        }
        for item in enquiries
    ]