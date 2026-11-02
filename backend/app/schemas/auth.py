
from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100,
    )

    email: EmailStr

    phone: str = Field(
        min_length=7,
        max_length=20,
        pattern=r"^\+?[0-9][0-9\s()-]{5,18}[0-9]$",
    )

    password: str = Field(
        min_length=8,
        max_length=128,
    )


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: str | None = None

    model_config = {
        "from_attributes": True
    }


class UserLogin(BaseModel):
    email: EmailStr

    password: str = Field(
        min_length=8,
        max_length=128,
    )


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    role: str
    name: str
