from config.db import engine, meta
from sqlalchemy import Column, ForeignKey, Table
from sqlalchemy.sql.sqltypes import Integer, String

ventas_total = Table(
    "ventas_total",
    meta,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("consecutivo", String(60)),
    Column("fecha", String(100)),
    Column("cliente_id", Integer),
    Column("total_venta", Integer),
    extend_existing=True,
)

# meta.create_all(engine)
