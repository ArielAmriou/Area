import uvicorn

from app import app
import health
import externalapi
import login


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)