from sqlalchemy import Column, Integer, String, Text, Date, DateTime
from database import Base
import datetime

class ExhibitionApplication(Base):
    __tablename__ = "exhibition_applications"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    applicant_member_id = Column(Integer, nullable=True) # 本来はログインユーザーのIDが入ります
    showroom_id = Column(Integer, nullable=True) # 文字列の場合は String(50) 等に変更してください
    product_name = Column(String(255), nullable=True)
    product_description = Column(Text, nullable=True) # ここにカテゴリや企業名をまとめます
    exhibition_purpose = Column(Text, nullable=True)
    requested_start_date = Column(Date, nullable=True)
    requested_end_date = Column(Date, nullable=True)
    required_space = Column(String(255), nullable=True)
    setup_requirements = Column(Text, nullable=True)
    status = Column(String(50), default="pending") # 初期ステータスは審査待ち(pending)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)