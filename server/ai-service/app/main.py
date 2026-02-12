from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise  

app = FastAPI()

register_tortoise(
    app,
    db_url="postgres://postgres.bmimvypwjbitykmqmmuv:j7tRL2jjVW7embKJ@aws-1-eu-north-1.pooler.supabase.com:5432/postgres",
    modules={"models": ["app.models.schema.schema"]},
    generate_schemas=True,
    add_exception_handlers=True,
)

@app.get("/")
def root():
    return {"message": "FastAPI is running 🚀"}
