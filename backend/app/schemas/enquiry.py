
from datetime import datetime

from pydantic import BaseModel, Field


class EnquiryCreate(BaseModel):
    service_name: str = Field(
        min_length=2,
        max_length=150,
    )

    plan_name: str = Field(
        min_length=2,
        max_length=100,
    )

    business_name: str = Field(
        min_length=2,
        max_length=150,
    )

    message: str = Field(
        min_length=10,
        max_length=3000,
    )


class EnquiryResponse(BaseModel):
    id: int
    service_name: str
    plan_name: str
    business_name: str
    message: str
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
