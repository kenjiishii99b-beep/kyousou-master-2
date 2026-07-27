from sqlalchemy import Column, Integer, String, DateTime, Boolean
from database import Base
import datetime

# 1. アンケート回答の大元（親テーブル）
class SurveyResponse(Base):
    __tablename__ = "survey_responses"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    survey_id = Column(Integer, nullable=True)
    respondent_member_id = Column(Integer, nullable=True)
    respondent_name = Column(String(255), nullable=True)
    respondent_email = Column(String(255), nullable=True)
    submitted_at = Column(DateTime, default=datetime.datetime.utcnow)
    consent_given = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# 2. 設問ごとの個別の回答（子テーブル）
class SurveyAnswer(Base):
    __tablename__ = "survey_answers"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    response_id = Column(Integer, nullable=False) # 親テーブルのIDを入れる場所
    question_id = Column(Integer, nullable=True)  # Q1, Q2 などの番号
    option_id = Column(Integer, nullable=True)
    answer_text = Column(String(1000), nullable=True) # テキスト回答用（目的や感想）
    answer_number = Column(Integer, nullable=True)    # 数値回答用（満足度）
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    