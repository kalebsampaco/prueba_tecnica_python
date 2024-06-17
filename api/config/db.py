import pymysql
from sqlalchemy import MetaData, create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("mysql+pymysql://ps:ps@db:3306/ps")

meta = MetaData()

conn = engine.connect()
# conn.execution_options(autocommit=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
