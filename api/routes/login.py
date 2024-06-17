import json

from config.db import conn
from config.jwt_config import tomar_token, validate_token
from fastapi import APIRouter, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel, Field

login = APIRouter()

class Usuario(BaseModel):
    email:str
    clave:str


@login.get('/login', tags=['authentication'])
def user_login(user:Usuario):
    if user.email == 'kalebampaco@gmail.com' and user.clave == '123456789':
        token:str=tomar_token(dict(user))
        return json.dumps(token)
    # try:
    #     result = conn.execute(process.select()).fetchall()
    #     procesos = []
    #     for row in result:
    #         proceso_dict = {}
    #         for i, value in enumerate(row):
    #             column = process.columns[i]
    #             proceso_dict[column.name] = value
    #         procesos.append(proceso_dict)
    #     return json.dumps(procesos)
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=str(e))
    # finally:
    #     conn.close()
