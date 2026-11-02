
"""align enquiries schema with current model

Revision ID: 211a556a791d
Revises: 7b0c91595392
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "211a556a791d"
down_revision: Union[str, Sequence[str], None] = "7b0c91595392"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Keep user_id nullable for old enquiries without a known owner.
    op.add_column(
        "enquiries",
        sa.Column("user_id", sa.Integer(), nullable=True),
    )

    op.create_foreign_key(
        "fk_enquiries_user_id_users",
        "enquiries",
        "users",
        ["user_id"],
        ["id"],
        ondelete="CASCADE",
    )

    op.create_index(
        "ix_enquiries_user_id",
        "enquiries",
        ["user_id"],
        unique=False,
    )

    # Add new model fields temporarily nullable.
    op.add_column(
        "enquiries",
        sa.Column("service_name", sa.String(length=150), nullable=True),
    )

    op.add_column(
        "enquiries",
        sa.Column("plan_name", sa.String(length=100), nullable=True),
    )

    op.add_column(
        "enquiries",
        sa.Column("business_name", sa.String(length=150), nullable=True),
    )

    # Map legacy data into the new fields.
    op.execute(
        """
        UPDATE enquiries
        SET
            service_name = COALESCE(
                NULLIF(TRIM(service_slug), ''),
                'General Enquiry'
            ),
            plan_name = 'Legacy Enquiry',
            business_name = COALESCE(
                NULLIF(TRIM(company_name), ''),
                'Not Provided'
            )
        """
    )

    # Link enquiry 3 only if the email and user ID match.
    op.execute(
        """
        UPDATE enquiries
        SET user_id = 3
        WHERE id = 3
          AND LOWER(TRIM(email)) = 'tanmayp@gmail.com'
          AND EXISTS (
              SELECT 1
              FROM users
              WHERE users.id = 3
                AND LOWER(TRIM(users.email)) = 'tanmayp@gmail.com'
          )
        """
    )

    # New fields are required by the current model.
    op.alter_column(
        "enquiries",
        "service_name",
        existing_type=sa.String(length=150),
        nullable=False,
    )

    op.alter_column(
        "enquiries",
        "plan_name",
        existing_type=sa.String(length=100),
        nullable=False,
    )

    op.alter_column(
        "enquiries",
        "business_name",
        existing_type=sa.String(length=150),
        nullable=False,
    )

    # user_id remains nullable for legacy enquiries.
    # Current application code must provide user_id for new enquiries.


def downgrade() -> None:
    op.drop_index(
        "ix_enquiries_user_id",
        table_name="enquiries",
    )

    op.drop_constraint(
        "fk_enquiries_user_id_users",
        "enquiries",
        type_="foreignkey",
    )

    op.drop_column("enquiries", "business_name")
    op.drop_column("enquiries", "plan_name")
    op.drop_column("enquiries", "service_name")
    op.drop_column("enquiries", "user_id")
