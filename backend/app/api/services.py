
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models import Service
from app.schemas.service import ServiceResponse


router = APIRouter(prefix="/api/v1/services", tags=["Services"])

DatabaseSession = Annotated[Session, Depends(get_db)]


@router.get("", response_model=list[ServiceResponse])
def list_services(
    db: DatabaseSession,
    domain: str | None = Query(default=None),
):
    statement = select(Service).where(Service.is_active.is_(True))

    if domain:
        statement = statement.where(
            Service.domain == domain.strip().upper()
        )

    statement = statement.order_by(Service.id)

    return db.scalars(statement).all()


@router.get("/{slug}", response_model=ServiceResponse)
def get_service(slug: str, db: DatabaseSession):
    service = db.scalar(
        select(Service).where(
            Service.slug == slug,
            Service.is_active.is_(True),
        )
    )

    if service is None:
        raise HTTPException(
            status_code=404,
            detail="Service not found",
        )

    return service
