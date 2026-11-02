
from fastapi import APIRouter, Depends, HTTPException, status
from pwdlib import PasswordHash
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.auth import UserRegister, UserResponse
from app.core.security import (
    create_access_token,
    verify_password,
)

from app.schemas.auth import UserLogin, TokenResponse

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

password_hash = PasswordHash.recommended()


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register_user(
    user_data: UserRegister,
    db: Session = Depends(get_db),
):
    email = user_data.email.lower()

    existing_user = db.scalar(
        select(User).where(User.email == email)
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email is already registered",
        )

    new_user = User(
        name=user_data.name.strip(),
        email=email,
        phone=user_data.phone.strip(),
        hashed_password=password_hash.hash(user_data.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login", response_model=TokenResponse)
def login_user(
    login_data: UserLogin,
    db: Session = Depends(get_db),
):
    email = login_data.email.lower()

    user = db.scalar(
        select(User).where(User.email == email)
    )

    if not user or not verify_password(
        login_data.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(user.id)

    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "name": user.name,
    }
