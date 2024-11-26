from pydantic import BaseModel

class DashboardData(BaseModel):
    email: str
    total_notes: int
