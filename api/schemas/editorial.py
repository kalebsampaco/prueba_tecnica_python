from typing import Dict, List, Optional

from pydantic import BaseModel, Field


class Editorial(BaseModel):
    idEditorial: Optional[int] = Field(None, description="ID del cliente")
    editorial: str
