from app import app

@app.get("/health")
async def health():
    return {"message": "Health, everything work correctly."}

