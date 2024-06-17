from typing import List, Optional

from pydantic import BaseModel, Field


class VentaSchema(BaseModel):
    id: Optional[int] = Field(None, description="ID del cliente")
    consecutivo: str
    fecha: str
    cliente_id: int
    total_venta: int
