from typing import Optional
from pydantic import BaseModel, EmailStr

class UserInDB(BaseModel):
    id: Optional[str]
    username: str
    email: EmailStr
    hashed_password: str
