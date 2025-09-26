from fastapi import FastAPI, UploadFile, File, Depends
from sqlalchemy.orm import Session
import models, database, utils
from hashlib import sha256

# Create database tables
database.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="PDF Upload + Blockchain Demo")

# Blockchain simulation function
def save_user_on_chain(user_id: int, full_name: str, email: str) -> str:
    # Simulate a blockchain transaction hash
    data = f"{user_id}-{full_name}-{email}"
    return sha256(data.encode()).hexdigest()


@app.post("/register")
async def register(
    full_name: str,
    email: str,
    passport_or_aadhar: str,
    destination: str,
    hotel: str,
    itinerary: str,
    emergency_contact: str,
    pdf: UploadFile = File(...),
    db: Session = Depends(database.get_db)
):
    # Save PDF
    pdf_path = utils.save_pdf(pdf)

    # Create user entry
    user = models.User(
        full_name=full_name,
        email=email,
        passport_or_aadhar=passport_or_aadhar,
        destination=destination,
        hotel=hotel,
        itinerary=itinerary,
        emergency_contact=emergency_contact,
        pdf_file=pdf_path
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Simulate storing on blockchain
    tx_hash = save_user_on_chain(user.id, full_name, email)
    user.blockchain_tx = tx_hash
    db.commit()
    db.refresh(user)

    return {
        "message": "User registered successfully",
        "user_id": user.id,
        "pdf_file": pdf_path,
        "blockchain_tx": tx_hash
    }
