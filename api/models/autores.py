from config.db import engine, meta
from sqlalchemy import Column, Table
from sqlalchemy.sql.sqltypes import Integer, String

at = Table("autores", meta,
                Column("idAutor", Integer, primary_key=True, autoincrement=True),
                Column("Autor", String(150)),
                extend_existing=True,
                )

# meta.create_all(engine)
