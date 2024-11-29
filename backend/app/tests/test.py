# backend/app/tests/test_endpoints.py
import pytest
from fastapi import status
from app.schemas import UserCreate, PlanType
from app.models.user import User
from app.db.session import SessionLocal
from app.services.user_service import create_user, get_user_by_email
from app.core.security import get_password_hash

@pytest.fixture
def db():
    db = SessionLocal()
    yield db
    db.close()

def test_register_user_success(client, db):
    """
    Test registering a new user successfully.
    """
    response = client.post(
        "/register",
        json={"email": "testuser@example.com", "password": "SecureP@ssw0rd"}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["email"] == "testuser@example.com"
    assert "id" in data

def test_register_user_existing_email(client, db):
    """
    Test registering a user with an existing email.
    """
    # First, create a user directly in the database
    user_in = UserCreate(email="existinguser@example.com", password="AnotherP@ssw0rd")
    create_user(db, user_in=user_in)

    # Attempt to register with the same email
    response = client.post(
        "/register",
        json={"email": "existinguser@example.com", "password": "NewP@ssw0rd"}
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    data = response.json()
    assert data["detail"] == "Email already registered"

def test_login_user_success(client, db):
    """
    Test logging in a user successfully.
    """
    # First, create a user with hashed password
    password = "LoginP@ssw0rd"
    hashed_password = hash_password(password)
    user = User(email="loginuser@example.com", hashed_password=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)

    # Attempt to login
    response = client.post(
        "/login",
        data={"username": "loginuser@example.com", "password": "LoginP@ssw0rd"}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_select_plan_success(client, db):
    """
    Test selecting a plan successfully.
    """
    # First, create and login a user to get the token
    user_in = UserCreate(email="planuser@example.com", password="PlanP@ssw0rd")
    create_user(db, user_in=user_in)

    login_response = client.post(
        "/login",
        data={"username": "planuser@example.com", "password": "PlanP@ssw0rd"}
    )
    assert login_response.status_code == status.HTTP_200_OK
    token = login_response.json()["access_token"]

    # Select a plan
    response = client.put(
        "/select-plan",
        json={"plan_in": "plus"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["plan"] == "plus"
