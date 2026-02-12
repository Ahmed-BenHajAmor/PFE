

from typing import Optional

from pydantic import BaseModel


class SoundsGetDTO(BaseModel):
    time_of_day: str = None
    mode: str = None
    activity: str = None
    temperature: int = None
    season: str = None
    sounds: list = None
    environment: Optional[str] = None

    prompt : str = None