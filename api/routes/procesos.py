from fastapi import APIRouter, HTTPException
from config.db import conn
from models.procesos import process
from models.movimientos import mov
from models.actuaciones import act
import json
from config.jwt_config import tomar_token, validate_token

proc = APIRouter()

@proc.get('/procesos')
def traer_procesos():
    try:
        result = conn.execute(process.select()).fetchall()
        procesos = []
        for row in result:
            proceso_dict = {}
            for i, value in enumerate(row):
                column = process.columns[i]
                proceso_dict[column.name] = value
            procesos.append(proceso_dict)
        return json.dumps(procesos)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    # finally:
    #     conn.close()

@proc.get('/movimientos')
def traer_procesos():
    try:
        result = conn.execute(mov.select()).fetchall()
        movimientos = []
        for row in result:
            mov_dict = {}
            for i, value in enumerate(row):
                column = mov.columns[i]  # Acceder a las columnas de la tabla mov
                mov_dict[column.name] = value
            movimientos.append(mov_dict)
        return json.dumps(movimientos)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    # finally:
    #     conn.close()

@proc.get('/actuaciones')
def traer_procesos():
    try:
        result = conn.execute(act.select()).fetchall()
        actuaciones = []
        for row in result:
            mov_dict = {}
            for i, value in enumerate(row):
                column = mov.columns[i]  # Acceder a las columnas de la tabla mov
                mov_dict[column.name] = value
            actuaciones.append(mov_dict)
        return json.dumps(actuaciones)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    # finally:
    #     conn.close()
