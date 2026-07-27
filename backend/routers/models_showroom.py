# routers/models_showroom.py
from sqlalchemy import Column, String, Integer, DateTime
from database import Base

class Showroom(Base):
    __tablename__ = "showrooms"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    prefecture = Column(String(20), index=True)
    city = Column(String(50))
    address = Column(String(255))
    description = Column(String(500))
    capacity = Column(Integer)
    facilities = Column(String(255))
    image_url = Column(String(255))
    status = Column(String(20))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)