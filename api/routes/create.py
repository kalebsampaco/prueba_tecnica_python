import json
import traceback
from typing import List

from config.db import conn, get_db
from config.jwt_config import tomar_token, validate_token
from fastapi import APIRouter, Depends, HTTPException
from models.clientes import cli
from models.productos import prod
from schemas.cliente import Cliente
from schemas.producto import Producto
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

create = APIRouter()

@create.post('/clientes', tags=["cliente"], response_model=Cliente, description="Create a new client")
def create_cliente(cliente: Cliente, db: Session = Depends(get_db)):
    try:
        new_client = {
            "cedula": cliente.cedula,
            "nombres": cliente.nombres,
            "direccion": cliente.direccion,
            "telefono": cliente.telefono,
            "email": cliente.email
            }
        result = db.execute(cli.insert().values(new_client))
        db.commit()
        return db.execute(cli.select().where(cli.c.id == result.lastrowid)).first()
    except SQLAlchemyError as e:
        # Rollback de la transacción en caso de error
        db.rollback()
        # Log del error para depuración
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))


@create.post('/productos', tags=["productos"], response_model=Producto, description="Create a new product")
def traer_procesos(producto: Producto, db: Session = Depends(get_db)):
    try:
        new_product = {
            "codigo": producto.codigo,
            "nombre": producto.nombre,
            "valor_venta": producto.valor_venta,
            "iva": producto.iva,
            "porcentaje": producto.porcentaje
            }
        result = db.execute(prod.insert().values(new_product))
        db.commit()
        return db.execute(prod.select().where(prod.c.id == result.lastrowid)).first()
    except SQLAlchemyError as e:
        # Rollback de la transacción en caso de error
        db.rollback()
        # Log del error para depuración
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))


@create.get('/clientes', tags=["clientes"],
    response_model=List[Cliente],
    description="Get a list of all clients")
def traer_procesos(db: Session = Depends(get_db)):
    try:
        return db.execute(cli.select()).fetchall()
    except SQLAlchemyError as e:
        # Rollback de la transacción en caso de error
        db.rollback()
        # Log del error para depuración
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))


@create.get('/productos', tags=["productos"],
    response_model=List[Producto],
    description="Get a list of all clients")
def traer_procesos(db: Session = Depends(get_db)):
    try:
        return db.execute(prod.select()).fetchall()
    except SQLAlchemyError as e:
        # Rollback de la transacción en caso de error
        db.rollback()
        # Log del error para depuración
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

