
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "BRAND-ROOTS API"

    db_host: str = "localhost"
    db_port: int = 5432
    db_name: str = "brand_roots"
    db_user: str = "postgres"
    db_password: str
    jwt_secret_key: str
    access_token_expire_minutes: int = 30

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
