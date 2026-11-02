"""add progress updates

Revision ID: 7b0c91595392
Revises: d8b2a482db58
Create Date: 2026-11-02 20:07:51.179396

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision: str = '7b0c91595392'
down_revision: Union[str, Sequence[str], None] = 'd8b2a482db58'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "progress_updates",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("enquiry_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=150), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column(
            "status",
            sa.String(length=30),
            nullable=False,
            server_default="in_progress",
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["enquiry_id"],
            ["enquiries.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        op.f("ix_progress_updates_id"),
        "progress_updates",
        ["id"],
        unique=False,
    )

    op.create_index(
        op.f("ix_progress_updates_enquiry_id"),
        "progress_updates",
        ["enquiry_id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        op.f("ix_progress_updates_enquiry_id"),
        table_name="progress_updates",
    )

    op.drop_index(
        op.f("ix_progress_updates_id"),
        table_name="progress_updates",
    )

    op.drop_table("progress_updates")