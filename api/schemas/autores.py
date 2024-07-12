from typing import Optional

from pydantic import BaseModel, Field


class Autor(BaseModel):
    idAutor: Optional[int] = Field(None, description="ID del cliente")
    Autor: str

