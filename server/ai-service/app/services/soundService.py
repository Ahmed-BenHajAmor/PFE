from app.models.schema.supabase_config import supabase

class SoundService:
    def __init__(self):
        pass

    def get_all_sounds(self):
        return supabase.table("Sound").select("*").execute()