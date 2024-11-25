from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.user import UserCreate, UserOut
from app.services.user_service import create_user, authenticate_user
from app.core.security import create_acces_token
from datetime import timedelta
from app.core.config import settings

router = APIRouter()

@router.post("/register", response_model=UserOut)
async def register(user_in: UserCreate):
    user = create_user(user_in)
    return user

@router.post("/login")
async def login(form_data: UserCreate):
    user = authenticate_user(email=form_data.email, password=form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_acces_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
