import hashlib

def save_user_on_chain(user_id: int, full_name: str, email: str) -> str:
    # Simulate blockchain by creating a SHA256 hash
    data = f"{user_id}-{full_name}-{email}"
    tx_hash = hashlib.sha256(data.encode()).hexdigest()
    print(f"Blockchain tx: {tx_hash}")
    return tx_hash
