from typing import Optional

from pydantic import BaseModel, Field


class Categoria(BaseModel):
    idCategoria: Optional[int] = Field(None, description="ID del cliente")
    categoria: str
