from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    passport_or_aadhar = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    hotel = Column(String, nullable=False)
    itinerary = Column(String, nullable=False)
    emergency_contact = Column(String, nullable=False)
    pdf_file = Column(String, nullable=False)
    blockchain_tx = Column(String, nullable=True)
