from config.db import engine, meta
from sqlalchemy import Column, ForeignKey, Table
from sqlalchemy.sql.sqltypes import Float, Integer, String

ventas_detalle = Table(
    "ventas_detalle",
    meta,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("producto_id", Integer),
    Column("venta_id", Integer),
    Column("valor_producto", Integer),
    Column("iva_calculado", Float),
    extend_existing=True,
)

# meta.create_all(engine)
