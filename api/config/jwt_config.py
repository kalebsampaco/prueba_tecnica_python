from jwt import encode, decode

def tomar_token(dato:dict)->str:
    token:str =encode(payload=dato, key='clave$ecreta', algorithm='HS256')
    return token

def validate_token(token:str)->dict:
    dato:dict= decode(token, key='clave$ecreta', algorithms=['HS256'])
    return dato
