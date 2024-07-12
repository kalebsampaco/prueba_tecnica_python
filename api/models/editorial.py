from config.db import engine, meta
from sqlalchemy import Column, Table
from sqlalchemy.sql.sqltypes import Integer, String

ed = Table("editorial", meta,
                Column("idEditorial", Integer, primary_key=True, autoincrement=True),
                Column("editorial", String(150)),
                extend_existing=True,
                )

# meta.create_all(engine)
