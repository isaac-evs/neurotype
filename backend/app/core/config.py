from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "NeuroType"
    SQLALCHEMY_DATABASE_URI: str = "postgresql://postgres:rootpostgrespassword@database1.cnmigicey46e.us-east-2.rds.amazonaws.com:5432/postgres"
    SECRET_KEY: str = "t7lzOFk41j736Pmja"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM: str = "HS256"

    class Config:
        case_sensitive = True

settings = Settings()