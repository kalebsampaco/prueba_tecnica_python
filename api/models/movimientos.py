from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta
mov = Table("movimientos", meta,
                Column("id", Integer, primary_key=True),
                Column("dependencia", String(200)),
                Column("ciudad", String(100)),
                Column("fecha", String(60)),
                Column("actores", String(150)),
                Column("demandado", String(100)),
                Column("no_proceso", String(200)),
                extend_existing=True,
                )
