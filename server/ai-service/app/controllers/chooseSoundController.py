from fastapi import APIRouter, Query
from typing import List, Optional
from app.services.scoringService import ScoringService

router = APIRouter(prefix="/sounds", tags=["Sounds"])
scoringService = ScoringService()

@router.get("/")
async def match_prompt(
    time_of_day: Optional[str] = None,
    mood: Optional[str] = None,
    activity: Optional[str] = None,
    environment: Optional[str] = None,
    temperature: Optional[int] = None,
    season: Optional[str] = None,
    sounds: Optional[List[str]] = Query(None),
    prompt: Optional[str] = None
) -> List[str]:
    
    features = {
        "time_of_day": time_of_day,
        "mood": mood,
        "activity": activity,
        "environment": environment,
        "temperature": temperature,
        "season": season,
        "sounds": sounds,
        "prompt": prompt
    }
    sounds_scores = scoringService.score(features)
    return  [item[0] for item in sounds_scores[:2]]

