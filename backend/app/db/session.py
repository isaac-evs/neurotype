from pymongo import MongoClient
from app.core.config import settings

client = MongoClient(settings.MONGODB_URL)
db = client.get_default_database()
