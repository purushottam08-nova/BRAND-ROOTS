
from typing import Annotated, Literal

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.auth import get_current_admin
from app.db.database import get_db
from app.models import Admin, Enquiry
from app.schemas.enquiry import (
    EnquiryListResponse,
    EnquiryResponse,
    EnquiryStatusUpdate,
)


router = APIRouter(
    prefix="/api/v1/admin/enquiries",
    tags=["Admin Enquiries"],
)

DatabaseSession = Annotated[Session, Depends(get_db)]
CurrentAdmin = Annotated[Admin, Depends(get_current_admin)]

StatusFilter = Literal[
    "new",
    "contacted",
    "in_progress",
    "completed",
    "rejected",
]


@router.get("", response_model=EnquiryListResponse)
def list_enquiries(
    db: DatabaseSession,
    admin: CurrentAdmin,
    page: Annotated[int, Query(ge=1)] = 1,
    page_size: Annotated[int, Query(ge=1, le=100)] = 10,
    status: StatusFilter | None = None,
):
    query = select(Enquiry)

    if status is not None:
        query = query.where(Enquiry.status == status)

    total_query = select(func.count()).select_from(query.subquery())
    total = db.scalar(total_query) or 0

    items_query = (
        query.order_by(Enquiry.created_at.desc(), Enquiry.id.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    )

    items = list(db.scalars(items_query).all())

    return EnquiryListResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
    )


@router.patch("/{enquiry_id}", response_model=EnquiryResponse)
def update_enquiry_status(
    enquiry_id: int,
    payload: EnquiryStatusUpdate,
    db: DatabaseSession,
    admin: CurrentAdmin,
):
    enquiry = db.get(Enquiry, enquiry_id)

    if enquiry is None:
        raise HTTPException(
            status_code=404,
            detail="Enquiry not found.",
        )

    enquiry.status = payload.status
    db.commit()
    db.refresh(enquiry)

    return enquiry
