# app/schemas/dashboard.py
from pydantic import BaseModel
from typing import Optional, Dict, List

class DailyEmotionData(BaseModel):
    date: str  # ISO date string
    emotions: Dict[str, int]

class DashboardData(BaseModel):
    name: str
    profile_photo_url: Optional[str] = None
    total_notes: int
    emotion_counts: Dict[str, int]
    weekly_emotion_data: List[DailyEmotionData]
    prevalent_emotion_today: Optional[str]
