
from app.dtos.featuresDto import SoundCreateDTO

class ScoringService:
    def __init__(self):
        self.features = [("time_of_day", 2), ("mood", 3), ("activity", 3), ("environment", 1), ("temperature", 1), ("season", 1)]
    
    
    def score(self,
            features: SoundCreateDTO,
            sounds: list
    ):
        
        for sound in sounds:
            score = 0
            coefSum = 0
            for feature, coef in self.features:
                if getattr(features, feature) == sound.get(feature):
                    score += 1 * 2
