import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.db.session import SessionLocal, engine
from app.db.base import Base

Base.metadata.create_all(bind=engine)

@pytest.fixture(scope="module")
def client():

    with TestClient(app) as c:
        yield c

    Base.metadata.drop_all(bind=engine)
