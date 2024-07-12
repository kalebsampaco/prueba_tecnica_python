from config.db import engine, meta
from sqlalchemy import Column, Table
from sqlalchemy.sql.sqltypes import Integer, String

ct = Table("categorias", meta,
                Column("idCategoria", Integer, primary_key=True, autoincrement=True),
                Column("categoria", String(150)),
                extend_existing=True,
                )

# meta.create_all(engine)
