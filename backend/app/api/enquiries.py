
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models import Enquiry, Service
from app.schemas.enquiry import EnquiryCreate, EnquiryResponse


router = APIRouter(prefix="/api/v1/enquiries", tags=["Enquiries"])

DatabaseSession = Annotated[Session, Depends(get_db)]


@router.post(
    "",
    response_model=EnquiryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_enquiry(
    payload: EnquiryCreate,
    db: DatabaseSession,
):
    service_slug = (
        payload.service_slug.strip()
        if payload.service_slug
        else None
    )

    if service_slug:
        service = db.scalar(
            select(Service).where(
                Service.slug == service_slug,
                Service.is_active.is_(True),
            )
        )

        if service is None:
            raise HTTPException(
                status_code=422,
                detail="Selected service does not exist or is inactive.",
            )

    enquiry = Enquiry(
        full_name=payload.full_name.strip(),
        email=str(payload.email),
        company_name=(
            payload.company_name.strip()
            if payload.company_name and payload.company_name.strip()
            else None
        ),
        service_slug=service_slug,
        message=payload.message.strip(),
    )

    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)

    return enquiry
