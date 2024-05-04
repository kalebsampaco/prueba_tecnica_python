# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import mysql.connector
from mysql.connector import errorcode
from scrapy.exceptions import DropItem
from itemadapter import ItemAdapter

class ProcesosPipeline:

    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            host=crawler.settings.get('MYSQL_HOST'),
            user=crawler.settings.get('MYSQL_USER'),
            password=crawler.settings.get('MYSQL_PASSWORD'),
            database=crawler.settings.get('MYSQL_DATABASE')
        )

    def open_spider(self, spider):
        self.conn = mysql.connector.connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database
        )
        self.cursor = self.conn.cursor()

    def close_spider(self, spider):
        self.cursor.close()
        self.conn.close()

    def process_item(self, item, spider):

        self.conn = mysql.connector.connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database
        )
        self.cursor = self.conn.cursor()
        query = ''
        if item['table'] == 'procesos':
            self.cursor.execute(f'''
                INSERT INTO {item['table']}
                (fecha, no_proceso, accion_infraccion)
                VALUES
                (%s, %s, %s)
            ''', (item['fecha'], item['no_proceso'], item['accion_infraccion']))
        elif item['table'] == 'movimientos':
            self.cursor.execute(f'''
                INSERT INTO {item['table']}
                (dependencia, ciudad, fecha, actores, demandado, no_proceso)
                VALUES
                (%s, %s, %s, %s, %s, %s)
            ''', (item['dependencia'], item['ciudad'], item['fecha'], item['actores'], item['demandado'], item['no_proceso']))
        else:
            self.cursor.execute(f'''
                INSERT INTO {item['table']}
                (delito_asunto, nombre, nombre_archivo, actores, demandado, no_proceso)
                VALUES
                (%s, %s, %s, %s, %s, %s)
            ''', (item['delito_asunto'], item['nombre'], item['nombre_archivo'], item['actores'], item['demandado'], item['no_proceso']))

        try:

            self.conn.commit()
            return item
        except mysql.connector.Error as e:
            raise DropItem(f'Error inserting item: {e}')
