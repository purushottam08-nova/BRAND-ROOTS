
from getpass import getpass

from sqlalchemy import select

from app.db.database import SessionLocal
from app.models import Admin
from app.core.security import hash_password


def main():
    email = input("Admin email: ").strip().lower()

    if "@" not in email:
        print("Please enter a valid email.")
        return

    password = getpass("Create admin password (6+ characters): ")
    confirmation = getpass("Confirm password: ")

    if len(password) < 6:
        print("Password must contain at least 6 characters.")
        return

    if password != confirmation:
        print("Passwords do not match.")
        return

    db = SessionLocal()

    try:
        existing_admin = db.scalar(
            select(Admin).where(Admin.email == email)
        )

        if existing_admin:
            print("An admin with this email already exists.")
            return

        admin = Admin(
            email=email,
            password_hash=hash_password(password),
            is_active=True,
        )

        db.add(admin)
        db.commit()

        print("Admin created successfully.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    main()
