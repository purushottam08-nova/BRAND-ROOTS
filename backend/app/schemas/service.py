
from pydantic import BaseModel, ConfigDict


class ServiceResponse(BaseModel):
    id: int
    slug: str
    domain: str
    name: str
    description: str
    keywords: str
    starting_price: int
    pricing_unit: str
    duration_min_weeks: int
    duration_max_weeks: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
