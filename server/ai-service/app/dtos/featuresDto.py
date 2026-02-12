

from typing import Optional

from pydantic import BaseModel


class SoundCreateDTO(BaseModel):
    time_of_day: str
    mode: str
    activity: str
    temperature: int
    season: str
    sounds: list
    environment: Optional[str] = None