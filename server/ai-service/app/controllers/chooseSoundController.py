from fastapi import APIRouter
from app.services.matchPromptService import MatchingPromptService
from app.services.scoringService import ScoringService
from types import List

router = APIRouter(prefix="/sounds", tags=["Sounds"])

matchPromptService = MatchingPromptService()
scoringService = ScoringService()

@router.get("/")
def matchPrompt(prompt: str) -> List[str]:
    return ["sound1", "sound2", "sound3"]

