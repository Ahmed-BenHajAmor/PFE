from fastapi import APIRouter, Query
from typing import List, Optional
from app.services.scoringService import ScoringService
from app.services.matchPromptService import MatchingPromptService
from app.services.soundService import SoundService

router = APIRouter(prefix="/sounds", tags=["Sounds"])

scoringService = ScoringService()
matchPromptService = MatchingPromptService()
soundService = SoundService()


@router.get("/")
async def getMatchedSounds(
    time_of_day: Optional[str] = None,
    activity: Optional[List[str]] = Query(None),     
    mood: Optional[List[str]] = Query(None),         
    environment: Optional[List[str]] = Query(None),  
    temperature: Optional[int] = None,
    season: Optional[List[str]] = Query(None),       
    prompt: Optional[str] = None
) -> List[str]:
    
    features = {
        "time_of_day": time_of_day,
        "mood": mood,
        "activity": activity,
        "environment": environment,
        "temperature": temperature,
        "season": season,
        "prompt": prompt
    }

    sounds = soundService.get_all_sounds()

    prompt_matched_sounds = matchPromptService.matchPrompt(prompt, sounds)
    prompt_matched_sounds_ids = [s["id"] for s in prompt_matched_sounds]

    sounds_scores = scoringService.score(features, sounds)
    top_scores_ids = [item[0] for item in sounds_scores[:1]]  
    top_prompt_ids = prompt_matched_sounds_ids[:1]            

    return list(set(top_scores_ids + top_prompt_ids))
