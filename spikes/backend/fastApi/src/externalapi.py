import httpx

from app import app

@app.get("/weather/{latitude}-{longitude}")
async def weather(latitude, longitude):
    api_url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m"
    async with httpx.AsyncClient() as client:
        response = await client.get(api_url)
        response.raise_for_status()
        infos = response.json()
        return {"current": infos["current"]}
