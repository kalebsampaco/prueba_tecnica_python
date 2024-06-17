from config.db import engine, meta
from sqlalchemy import Column, Table
from sqlalchemy.sql.sqltypes import Integer, String

cli = Table("clientes", meta,
                Column("id", Integer, primary_key=True, autoincrement=True),
                Column("cedula", String(150)),
                Column("nombres", String(100)),
                Column("direccion", String(100)),
                Column("telefono", String(150)),
                Column("email", String(100)),
                extend_existing=True,
                )

# meta.create_all(engine)
