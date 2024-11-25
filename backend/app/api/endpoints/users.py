from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app import schemas
from app.api import deps
from app.core.security import create_access_token, verify_password
from app.models.user import User
from app.services.user_service import create_user, get_user_by_email

router = APIRouter()

@router.post(
    "/register",
    response_model=schemas.User,
    summary="Register a new user",
    description="Create a new user account by providing a valid email and password."
)
def register_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreate
):
    """
    Registers a new user in the system.

    - **email**: Unique email address of the user.
    - **password**: Password for the user account (will be hashed).
    """
    user = get_user_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = create_user(db, user_in=user_in)
    return user


@router.post(
    "/login",
    response_model=schemas.Token,
    summary="Login and get access token",
    description="Authenticate a user and generate an access token using their email and password."
)
def login_access_token(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    Authenticates a user and returns a JWT access token.

    - **username**: User's email (used as the username).
    - **password**: User's password.
    """
    user = get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token = create_access_token(subject=str(user.id))
    return {"access_token": access_token, "token_type": "bearer"}
