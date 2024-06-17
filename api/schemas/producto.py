from typing import Dict, List, Optional

from pydantic import BaseModel, Field


class Producto(BaseModel):
    id: Optional[int] = Field(None, description="ID del cliente")
    codigo: str
    nombre: str
    valor_venta: int
    iva: Optional[bool]
    porcentaje: Optional[int]

class ProductoDetalle(BaseModel):
    id: int
    valor_producto: int
    iva: bool
    iva_calculo:int

class Venta(BaseModel):
    id: Optional[int] = Field(None, description="ID del cliente")
    consecutivo: str
    fecha: str
    cliente_id: int
    total_venta: int
    productos: List[ProductoDetalle]
    valor_producto: int

    class Config:
        schema_extra = {
            "example": {
                "consecutivo": "1",
                "fecha": "14T131144Z20240614T131144Z",
                "cliente_id": 1,
                "total_venta": 200,
                "productos": [
                    {
                        "id": 1,
                        "valor_producto": 100,
                        "iva": True,
                        "iva_calculo": 19
                    }
                ],
                "valor_producto": 100
            }
        }
