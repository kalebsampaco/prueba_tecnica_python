# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ProcesosItem(scrapy.Item):
    # define the fields for your item here like:
    id = scrapy.Field()
    fecha = scrapy.Field()
    no_proceso = scrapy.Field()
    accion_infraccion = scrapy.Field()
    table =scrapy.Field()

class MovimientosItem(scrapy.Item):
    # define the fields for your item here like:
    dependencia = scrapy.Field()
    ciudad = scrapy.Field()
    fecha = scrapy.Field()
    actores = scrapy.Field()
    demandado = scrapy.Field()
    no_proceso = scrapy.Field()
    table =scrapy.Field()

class ActuacionesItem(scrapy.Item):
    # define the fields for your item here like:
    delito_asunto = scrapy.Field()
    nombre = scrapy.Field()
    nombre_archivo = scrapy.Field()
    actores = scrapy.Field()
    demandado = scrapy.Field()
    no_proceso = scrapy.Field()
    table =scrapy.Field()
