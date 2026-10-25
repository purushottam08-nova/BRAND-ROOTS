from typing import Annotated

import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    decode_access_token,
    verify_password,
)
from app.db.database import get_db
from app.models import Admin
from app.schemas.auth import AdminLogin, AdminProfile, TokenResponse


router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

DatabaseSession = Annotated[Session, Depends(get_db)]
bearer_scheme = HTTPBearer(auto_error=False)


def get_current_admin(
    credentials: Annotated[
        HTTPAuthorizationCredentials | None,
        Depends(bearer_scheme),
    ],
    db: DatabaseSession,
) -> Admin:
    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired authentication token.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if credentials is None:
        raise unauthorized

    try:
        payload = decode_access_token(credentials.credentials)
        subject = payload.get("sub")

        if not isinstance(subject, str) or not subject.isdigit():
            raise unauthorized

        admin_id = int(subject)

    except (jwt.InvalidTokenError, ValueError):
        raise unauthorized

    admin = db.scalar(
        select(Admin).where(Admin.id == admin_id)
    )

    if admin is None or not admin.is_active:
        raise unauthorized

    return admin


@router.post("/login", response_model=TokenResponse)
def login(
    payload: AdminLogin,
    db: DatabaseSession,
):
    email = str(payload.email).lower()

    admin = db.scalar(
        select(Admin).where(Admin.email == email)
    )

    if (
        admin is None
        or not admin.is_active
        or not verify_password(payload.password, admin.password_hash)
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
        )

    token = create_access_token(admin.id)

    return TokenResponse(access_token=token)


@router.get("/me", response_model=AdminProfile)
def get_my_profile(
    admin: Annotated[Admin, Depends(get_current_admin)],
):
    return admin
