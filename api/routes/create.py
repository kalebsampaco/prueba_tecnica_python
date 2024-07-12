import json
import traceback
from typing import List

from config.db import conn, get_db
from config.jwt_config import tomar_token, validate_token
from fastapi import APIRouter, Depends, HTTPException
from models.autores import at
from models.categorias import ct
from models.editorial import ed
from models.libros import lb
from schemas.autores import Autor
from schemas.categoria import Categoria
from schemas.editorial import Editorial
from schemas.libros import Libros
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

create = APIRouter()

@create.post('/autores', tags=["autores"], response_model=Autor, description="Create a new autor")
def create_autor(autor: Autor, db: Session = Depends(get_db)):
    try:
        new_client = {
            "Autor": autor.Autor,
            }
        result = db.execute(at.insert().values(new_client))
        db.commit()
        return db.execute(at.select().where(at.c.idAutor == result.lastrowid)).first()
    except SQLAlchemyError as e:
        # Rollback de la transacción en caso de error
        db.rollback()
        # Log del error para depuración
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@create.post('/categoria', tags=["categoria"], response_model=Categoria, description="Create a new autor")
def create_categoria(categoria: Categoria, db: Session = Depends(get_db)):
    try:
        new_client = {
            "categoria": categoria.categoria,
            }
        result = db.execute(ct.insert().values(new_client))
        db.commit()
        return db.execute(ct.select().where(ct.c.idCategoria == result.lastrowid)).first()
    except SQLAlchemyError as e:
        # Rollback de la transacción en caso de error
        db.rollback()
        # Log del error para depuración
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@create.post('/editorial', tags=["editorial"], response_model=Editorial, description="Create a new autor")
def create_editorial(editorial: Editorial, db: Session = Depends(get_db)):
    try:
        new_client = {
            "editorial": editorial.editorial,
            }
        result = db.execute(ed.insert().values(new_client))
        db.commit()
        return db.execute(ed.select().where(ed.c.id == result.lastrowid)).first()
    except SQLAlchemyError as e:
        # Rollback de la transacción en caso de error
        db.rollback()
        # Log del error para depuración
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@create.post('/libros', tags=["libros"], response_model=Libros, description="Create a new autor")
def create_libro(libro: Libros, db: Session = Depends(get_db)):
    try:
        new_client = {
            "titulo": libro.titulo,
            "Autor": libro.Autor,
            "fecha_publicacion": libro.fecha_publicacion,
            "categoria": libro.categoria,
            "Editorial": libro.Editorial,
            "idioma": libro.idioma,
            "Paginas": libro.Paginas
            }
        result = db.execute(lb.insert().values(new_client))
        db.commit()
        return db.execute(lb.select().where(lb.c.id == result.lastrowid)).first()
    except SQLAlchemyError as e:
        # Rollback de la transacción en caso de error
        db.rollback()
        # Log del error para depuración
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@create.get('/autores', tags=["autores"],
    response_model=List[Autor],
    description="Get a list of all autors")
def traer_autores(db: Session = Depends(get_db)):
    try:
        return db.execute(at.select()).fetchall()
    except SQLAlchemyError as e:
        # Rollback de la transacción en caso de error
        db.rollback()
        # Log del error para depuración
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))


@create.get('/categoria', tags=["categoria"],
    response_model=List[Categoria],
    description="Get a list of all categories")
def traer_procesos(db: Session = Depends(get_db)):
    try:
        return db.execute(ct.select()).fetchall()
    except SQLAlchemyError as e:
        # Rollback de la transacción en caso de error
        db.rollback()
        # Log del error para depuración
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@create.get('/editorial', tags=["editorial"],
    response_model=List[Editorial],
    description="Get a list of all editorials")
def traer_procesos(db: Session = Depends(get_db)):
    try:
        return db.execute(ed.select()).fetchall()
    except SQLAlchemyError as e:
        # Rollback de la transacción en caso de error
        db.rollback()
        # Log del error para depuración
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))


@create.get('/libros', tags=["libros"],
    response_model=List[Libros],
    description="Get a list of all Books")
def traer_procesos(db: Session = Depends(get_db)):
    try:
        return db.execute(lb.select()).fetchall()
    except SQLAlchemyError as e:
        # Rollback de la transacción en caso de error
        db.rollback()
        # Log del error para depuración
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))
