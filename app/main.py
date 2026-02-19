from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="Deepfake Threat Detector", version="1.0.0")

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Deepfake Threat Detector API"}