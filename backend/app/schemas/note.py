from datetime import datetime
from pydantic import BaseModel

class NoteBase(BaseModel):
    text: str

class NoteCreate(NoteBase):
    pass

class NoteUpdate(NoteBase):
    pass

class NoteInDBBase(NoteBase):
    id: int
    created_at: datetime
    user_id: int

    class Config:
        orm_mode = True

class Note(NoteInDBBase):
    pass
