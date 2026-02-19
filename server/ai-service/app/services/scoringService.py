from app.dtos.sounds_get_dto import SoundsGetDTO
from sortedcontainers import SortedList
from app.models.schema.supabase_config import supabase
from app.services.soundService import SoundService
class ScoringService:
    def __init__(self):
       pass
    
    
    from sortedcontainers import SortedList

class ScoringService:
    def __init__(self):
        pass

    def score(self, features, sounds):
        """
        Score sounds based on user features.

        features: dict with keys:
            - time_of_day: str
            - mood: list[str]
            - activity: list[str]
            - environment: list[str]
            - temperature: int
            - season: str
        sounds: list of dicts with sound data
        """
        soundsScores = SortedList(key=lambda x: -x[1])

        timeOfDayList = ["morning", "late morning", "evening", "late evening", "night", "late night"]
        seasonList = ["SPRING", "SUMMER", "AUTUMN", "WINTER"]
        for sound in sounds.data:
            score = 0
            coefSum = 0
            # ------------------- Time of day -------------------
            if features.get("time_of_day") and sound.get("timeOfDay"):
                if features["time_of_day"] in timeOfDayList and sound["timeOfDay"] in timeOfDayList:
                    diff = abs(timeOfDayList.index(features["time_of_day"]) - timeOfDayList.index(sound["timeOfDay"]))
                    coefSum += 2
                    if diff == 0:
                        score += 2
                    elif diff == 1:
                        score += 1.2

            # ------------------- Mood -------------------
            if features.get("mood"):
                coefSum += 3
                tmp = 0
                for mood in features["mood"]:
                    if mood in sound.get("mood", []):
                        tmp += 1
                score += 3 * tmp / len(features["mood"])

            # ------------------- Activity -------------------
            if features.get("activity"):
                coefSum += 3
                # features["activity"] can now be a list
                matching_activities = 0
                for act in features["activity"]:
                    if act in sound.get("activity", []):
                        matching_activities += 1
                score += 3 * matching_activities / len(features["activity"])

            # ------------------- Environment -------------------
            if features.get("environment"):
                coefSum += 1
                # features["environment"] can now be a list
                matching_envs = 0
                for env in features["environment"]:
                    if env in sound.get("environment", []):
                        matching_envs += 1
                score += 1 * matching_envs / len(features["environment"])

            # ------------------- Temperature -------------------
            if features.get("temperature") is not None and sound.get("temperature") is not None:
                coefSum += 1
                diff = abs(features["temperature"] - sound["temperature"])
                if diff <= 5:
                    score += 1
                elif diff <= 8:
                    score += 0.6
                elif diff <= 10:
                    score += 0.4

            # ------------------- Season -------------------
            if features.get("season") and sound.get("season"):
                if features["season"] in seasonList:
                    minDiff = float('inf')
                    for s in sound["season"]:
                        if s in seasonList:
                            minDiff = min(minDiff, abs(seasonList.index(features["season"]) - seasonList.index(s)))
                    coefSum += 2
                    if minDiff == 0:
                        score += 2
                    elif minDiff == 1:
                        score += 1.2

            # ------------------- Final score -------------------
            soundsScores.add((sound["id"], score / coefSum if coefSum > 0 else 0))

        return soundsScores


