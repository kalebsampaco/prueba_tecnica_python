import json
import traceback
from typing import List

from config.db import conn, engine, get_db
from config.jwt_config import tomar_token, validate_token
from fastapi import APIRouter, Depends, HTTPException
from models.ventas_detalle import ventas_detalle as vd
from models.ventas_total import ventas_total as vt
from schemas.producto import Venta
from schemas.venta import VentaSchema
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

ventas = APIRouter()

@ventas.post('/registrar_cabecera', tags=["cabecera"], response_model=VentaSchema, description="Regitrar cabecera de una venta")
def create_cliente(venta: Venta, db: Session = Depends(get_db)):
    try:
        cabecera = {
            "consecutivo": venta.consecutivo,
            "fecha": venta.fecha,
            "cliente_id": venta.cliente_id,
            "total_venta": venta.total_venta
        }

        result_ventas_total = db.execute(vt.insert().values(cabecera))
        result = db.execute(vt.select().where(vt.c.id == result_ventas_total.lastrowid)).first()
        venta_id = result_ventas_total.lastrowid
        print(venta.productos, 'venta_id')

        id_result = result[0] if result else None
        # Insertar detalle
        for producto in venta.productos:
            detalle = {
                "producto_id": producto.id,
                "venta_id": venta_id,
                "valor_producto":producto.valor_producto,
                "iva_calculado":producto.valor_producto * (producto.iva_calculo/100) if producto.iva else 0
            }
            result_detalle_venta = db.execute(vd.insert().values(detalle))
            db.commit()
        return result
    except SQLAlchemyError as e:
        # Rollback de la transacción en caso de error
        db.rollback()
        # Log del error para depuración
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))



@ventas.get('/ventas', tags=["ventas"],
    response_model=List[VentaSchema],
    description="Optiene lista de todas las ventas")
def traer_procesos(db: Session = Depends(get_db)):
    try:
        return db.execute(vt.select()).fetchall()
    except SQLAlchemyError as e:
        # Rollback de la transacción en caso de error
        conn.rollback()
        # Log del error para depuración
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

