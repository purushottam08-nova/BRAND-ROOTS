
from sqlalchemy import text

from app.db.database import engine


def main():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT version()"))
            print("Database connected successfully!")
            print(result.scalar())
    except Exception as error:
        print("Database connection failed.")
        print(f"Error: {error}")
        raise


if __name__ == "__main__":
    main()
