from config.db import engine, meta
from config.openapi import tags_metadata
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.autores import at
from models.categorias import ct
from models.editorial import ed
from models.libros import lb
from routes.create import create
from routes.login import login

app = FastAPI(
    title="Admin API",
    description="a REST API using python and mysql",
    version="0.0.1",
    openapi_tags=tags_metadata,
)
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear todas las tablas en el orden correcto
meta.create_all(engine)

app.include_router(create)
app.include_router(login)

