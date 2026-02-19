from google import genai
from google.genai import types
from sklearn.metrics.pairwise import cosine_similarity
from app.config import settings


class MatchingPromptService:
    def __init__(self):
        self.client = genai.Client(api_key=settings.GOOGLE_API_KEY)
        
    def matchPrompt(self, user_prompt, sounds):
        contents = [{"id": sound["id"], "text": sound["title"]+" "+sound["description"]} for sound in sounds.data]
        result = self.client.models.embed_content(
            model="gemini-embedding-001",
            contents=[content["text"] for content in contents],
            config=types.EmbedContentConfig(task_type="SEMANTIC_SIMILARITY")
        )
        contents_with_embeddings = [{"id": contents[i]["id"],"text": contents[i]["text"] ,"embedding": result.embeddings[i].values} for i in range(len(contents))]
        
        prompt_embedding = self.client.models.embed_content(
                model="gemini-embedding-001",
                contents=user_prompt
        ).embeddings[0].values

        result = sorted(contents_with_embeddings, key=lambda x: cosine_similarity([x["embedding"]], [prompt_embedding])[0][0], reverse=True)
        return result