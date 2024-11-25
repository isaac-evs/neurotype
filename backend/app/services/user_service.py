from app.models.user import UserInDB
from app.schemas.user import UserCreate
from app.core.security import get_password_hash, verify_password
from app.db.session import db
from bson.objectid import ObjectId

users_collection = db["users"]

def get_user_by_email(email: str):
    user = users_collection.find_one({"email": email})
    if user:
        return UserInDB(**user)
    return None

def create_user(user_in: UserCreate):
    hashed_password = get_password_hash(user_in.password)
    user_dict = user_in.dict()
    user_dict["hashed_password"] = hashed_password
    del user_dict["password"]
    result = users_collection.insert_one(user_dict)
    user_dict["id"] = str(result.inserted_id)
    return UserInDB(**user_dict)

def authenticate_user(email: str, password: str):
    user = get_user_by_email(email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user
