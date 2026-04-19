from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Threat(Base):
    __tablename__ = "threats"
    id = Column(Integer, primary_key=True, index=True)
    ip = Column(String, index=True)
    time = Column(String)
    method = Column(String)
    path = Column(String)
    status = Column(String)
    threat_name = Column(String)
    category = Column(String)
    severity = Column(String)
    confidence = Column(Float)
    description = Column(String)
    country = Column(String)
    lat = Column(Float)
    lng = Column(Float)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class Analysis(Base):
    __tablename__ = "analyses"
    id = Column(Integer, primary_key=True, index=True)
    executive_briefing = Column(Text)
    attack_narrative = Column(Text)
    risk_assessment = Column(Text)
    remediation_playbook = Column(Text)  # Store as JSON string
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
