from typing import Optional

from pydantic import BaseModel, Field


class Detalle(BaseModel):
    id: Optional[int] = Field(None, description="ID del cliente")
    producto: int
    venta_id: int
    valor_producto: int
    iva_calculado: int
