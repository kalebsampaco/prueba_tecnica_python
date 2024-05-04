from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta
act = Table("actuaciones", meta,
                Column("id", Integer, primary_key=True),
                Column("delito_asunto", String(150)),
                Column("nombre", String(100)),
                Column("nombre_archivo", String(100)),
                Column("actores", String(150)),
                Column("demandado", String(100)),
                Column("no_proceso", String(150)),
                extend_existing=True,
                )
