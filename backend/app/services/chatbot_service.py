import os
from openai import AsyncOpenAI
from datetime import date, timedelta
from app.db.session import SessionLocal
from app.services import note_service
from app.models.user import User

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def get_chatbot_response(user_message: str, current_user: User) -> str:
    today = date.today()
    start_of_week = today - timedelta(days=today.weekday()) 
    end_of_week = start_of_week + timedelta(days=6) 

    db = SessionLocal()
    notes = note_service.get_notes_by_user_and_date(
        db, user_id=current_user.id, start_date=start_of_week, end_date=end_of_week
    )
    db.close()

    total_emotion_counts = {
        "happy": 0,
        "calm": 0,
        "sad": 0,
        "upset": 0,
    }

    for note in notes:
        total_emotion_counts["happy"] += note.happy_count
        total_emotion_counts["calm"] += note.calm_count
        total_emotion_counts["sad"] += note.sad_count
        total_emotion_counts["upset"] += note.upset_count

    prevalent_emotion = max(total_emotion_counts, key=total_emotion_counts.get)

    messages = [
        {"role": "system", "content": "You are a mental health assistant."},
        {"role": "assistant", "content": f"The user's prevalent emotion this week has been {prevalent_emotion}."},
        {"role": "user", "content": user_message},
    ]


    response = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=150,
        temperature=0.7,
    )
    answer = response.choices[0].message.content.strip()
    return answer
