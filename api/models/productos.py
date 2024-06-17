from config.db import engine, meta
from sqlalchemy import Column, Table
from sqlalchemy.sql.sqltypes import Boolean, Float, Integer, String

prod = Table("productos", meta,
                Column("id", Integer, primary_key=True, autoincrement=True),
                Column("codigo", String(200)),
                Column("nombre", String(100)),
                Column("valor_venta", Integer),
                Column("iva", Boolean, default=False),
                Column("porcentaje", Float),
                extend_existing=True,
                )

# meta.create_all(engine)
