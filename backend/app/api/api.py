from fastapi import APIRouter
from app.api.endpoints import users, notes, dashboard

api_router = APIRouter()
api_router.include_router(users.router, tags=["users"])
api_router.include_router(notes.router, prefix="/notes", tags=["notes"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
