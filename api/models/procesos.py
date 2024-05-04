from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta

process = Table(
    "procesos",
    meta,
    Column("id", Integer, primary_key=True),
    Column("fecha", String(60)),
    Column("no_proceso", String(45)),
    Column("accion_infraccion", String(100)),
    extend_existing=True,
)
