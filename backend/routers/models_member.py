from sqlalchemy import Column, Integer, String
from database import Base

class Member(Base):
    __tablename__ = "members"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    display_name = Column(String(255))
    organization_name = Column(String(255))
    role = Column(String(50))
    status = Column(String(50))
    # 💡 この1行をクラスの中に追加するだけです！
    __table_args__ = {'extend_existing': True}