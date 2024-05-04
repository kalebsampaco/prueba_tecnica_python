from sqlalchemy import create_engine, MetaData

engine = create_engine("mysql+pymysql://ps:ps@db:3306/ps")

meta = MetaData()

conn = engine.connect()
