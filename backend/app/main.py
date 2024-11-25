from fastapi import FastAPI
from app.api.endpoints import users
from app.core.config import settings

app = FastAPI(title="NeuroType")

app.include_router(users.router, prefix="/users", tags=["users"])
