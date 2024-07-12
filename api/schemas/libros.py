from typing import List, Optional

from pydantic import BaseModel, Field


class Libros(BaseModel):
    id: Optional[int] = Field(None, description="ID del cliente")
    titulo: str
    fecha_publicacion: str
    Autor: int
    categoria: int
    Editorial: int
    idioma: str
    Paginas: int
