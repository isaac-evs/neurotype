import socketio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.api import api_router
from app.core.config import settings
from app.models.user import User
from app.services.chatbot_service import get_chatbot_response

from jose import jwt, JWTError
from app.db.session import SessionLocal

import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=['http://localhost:3000'], 
)

fastapi_app = FastAPI()

fastapi_app.include_router(api_router)



fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app = socketio.ASGIApp(sio, other_asgi_app=fastapi_app)

async def authenticate_user(sid, token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: int = int(payload.get("sub"))
    except (JWTError, ValueError):
        return None
    db = SessionLocal()
    user = db.query(User).filter(User.id == user_id).first()
    db.close()
    return user

connected_users = {}

@sio.event
async def connect(sid, environ):

    query_params = environ.get('asgi.scope').get('query_string', b'').decode()
    token = None
    for param in query_params.split('&'):
        if param.startswith('token='):
            token = param.split('=')[1]
            break
    if token is None:
        await sio.disconnect(sid)
        return
    user = await authenticate_user(sid, token)
    if user is None:
        await sio.disconnect(sid)
        return
    connected_users[sid] = user
    print(f"User {user.id} connected with SID {sid}")

@sio.event
async def message(sid, data):
    user = connected_users.get(sid)
    if user is None:
        await sio.disconnect(sid)
        return
    user_message = data.get('message')
    if user_message:

        response = await get_chatbot_response(user_message, user)

        await sio.emit('response', {'message': response}, room=sid)

@sio.event
async def disconnect(sid):
    user = connected_users.pop(sid, None)
    print(f"User {user.id if user else 'Unknown'} disconnected")
