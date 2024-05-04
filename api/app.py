from fastapi import FastAPI
from routes.procesos import proc
from routes.login import login

app = FastAPI()

app.include_router(proc)
app.include_router(login)

