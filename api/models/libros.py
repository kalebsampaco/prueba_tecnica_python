from config.db import engine, meta
from sqlalchemy import Column, Table
from sqlalchemy.sql.sqltypes import Integer, String

lb = Table("libros", meta,
                Column("id", Integer, primary_key=True, autoincrement=True),
                Column("titulo", String(150)),
                Column("fecha_publicacion", String(100)),
                Column("Autor", Integer),
                Column("categoria", Integer),
                Column("Editorial", Integer),
                Column("idioma", String(100)),
                Column("Paginas", Integer),
                extend_existing=True,
                )

# meta.create_all(engine)
