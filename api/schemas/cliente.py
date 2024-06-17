from typing import Optional

from pydantic import BaseModel, Field


class Cliente(BaseModel):
    id: Optional[int] = Field(None, description="ID del cliente")
    cedula: str
    nombres: str
    direccion: str
    telefono: str
    email: str
