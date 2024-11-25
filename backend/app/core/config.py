# app/core/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str = "t7lzOFk41j736Pmja"
    ALGORITHM: str = "HS256"  # Default value
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  # Default value
    MONGODB_URL: str = "mongodb+srv://isaacvazqsand:40xHCJjPBGvk9Ozg@production.y03wk.mongodb.net/?retryWrites=true&w=majority&appName=production"  # Default value

    class Config:
        case_sensitive = True

settings = Settings()
