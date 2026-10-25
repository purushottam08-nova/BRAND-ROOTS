from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


EnquiryStatus = Literal[
    "new",
    "contacted",
    "in_progress",
    "completed",
    "rejected",
]


class EnquiryCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    company_name: str | None = Field(default=None, max_length=160)
    service_slug: str | None = Field(default=None, max_length=100)
    message: str = Field(min_length=10, max_length=5000)


class EnquiryResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    company_name: str | None
    service_slug: str | None
    message: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class EnquiryStatusUpdate(BaseModel):
    status: EnquiryStatus


class EnquiryListResponse(BaseModel):
    items: list[EnquiryResponse]
    total: int
    page: int
    page_size: int

