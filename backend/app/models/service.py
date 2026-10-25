
from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class Service(Base):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )
    slug: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
        index=True,
    )
    domain: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        index=True,
    )
    name: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )
    description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )
    keywords: Mapped[str] = mapped_column(
        String(300),
        nullable=False,
        default="",
    )
    starting_price: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )
    pricing_unit: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="project",
    )
    duration_min_weeks: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )
    duration_max_weeks: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )
