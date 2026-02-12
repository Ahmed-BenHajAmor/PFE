from app.dtos.sounds_get_dto import SoundsGetDTO
from sortedcontainers import SortedList
from app.models.schema.supabase_config import supabase
class ScoringService:
    def __init__(self):
        pass
    def get_all_sounds(self):
        
        return supabase.table("Sound").select("*").execute()
    
    def score(
        self,
        features,
    ):
        sounds = self.get_all_sounds()
        soundsScores = SortedList(key=lambda x: -x[1])
        
        timeOfDayList = ["morning", "late morning", "evening", "late evening", "night", "late night"]
        seasonList = ["spring", "summer", "autumn", "winter"]
        
        for sound in sounds.data:
            score = 0
            coefSum = 0

            if (
                features["time_of_day"] is not None and
                features["time_of_day"] in timeOfDayList and
                sound["timeOfDay"] in timeOfDayList
            ):
                diff = abs(timeOfDayList.index(features["time_of_day"]) - timeOfDayList.index(sound["timeOfDay"]))
                coefSum += 2
                if diff == 0:
                    score += 2
                elif diff == 1:
                    score += 1.2

            if features["mood"] is not None:
                coefSum += 3
                if features["mood"] == sound["mood"]:
                    score += 3
            
            if features["activity"] is not None:
                coefSum += 3
                if features["activity"] == sound["activity"]:
                    score += 3

            if features["environment"] is not None:
                coefSum += 1
                if features["environment"] == sound["environment"]:
                    score += 1

            if features["temperature"] is not None and sound["temperature"] is not None:
                coefSum += 1
                diff = abs(features["temperature"] - sound["temperature"])
                if diff <= 5:
                    score += 1
                elif diff <= 8:
                    score += 0.6
                elif diff <= 10:
                    score += 0.4

            if (
                features["season"] is not None and
                features["season"] in seasonList and
                sound["season"] in seasonList
            ):
                diff = abs(seasonList.index(features["season"]) - seasonList.index(sound["season"]))
                coefSum += 2
                if diff == 0:
                    score += 2
                elif diff == 1:
                    score += 1.2

            soundsScores.add((sound["id"], score / coefSum if coefSum > 0 else 0))
        
        return soundsScores

