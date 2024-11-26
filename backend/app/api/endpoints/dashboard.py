from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api import deps
from app.schemas.dashboard import DashboardData
from app.models.user import User
from app.services import note_service

router = APIRouter()

@router.get("/", response_model=DashboardData)
def get_dashboard(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    total_notes = note_service.count_notes_by_user(db, user_id=current_user.id)
    return DashboardData(email=current_user.email, total_notes=total_notes)
