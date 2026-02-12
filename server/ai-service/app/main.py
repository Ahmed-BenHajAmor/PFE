from fastapi import FastAPI
from app.controllers.chooseSoundController import router as sounds_router

app = FastAPI()



app.include_router(sounds_router)