from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="Spotify Analyzer API")

# Register routes
app.include_router(router)