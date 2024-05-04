import scrapy
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from scrapy_splash import SplashRequest
from selenium.webdriver.common.action_chains import ActionChains
from procesos.items import ProcesosItem, MovimientosItem, ActuacionesItem

class GetprocesosSpider(scrapy.Spider):
    name = "getProcesos"
    allowed_domains = ["procesosjudiciales.funcionjudicial.gob.ec"]
    start_urls = ["https://procesosjudiciales.funcionjudicial.gob.ec/busqueda-filtros"]
    delay = 10
    def __init__(self):
        options = webdriver.FirefoxOptions()
        options.headless = True
        # service = Service("D:\Documentos_William_Sáenz\proyectos_geww\prueba-tecnica-python\procesos\procesos\geckodriver.exe")
        # service = Service("C:/Program Files/Mozilla Firefox/firefox.exe")
        service = webdriver.FirefoxService(log_output="D:\Documentos_William_Sáenz\proyectos_geww\prueba-tecnica-python\procesos\procesos\geckodriver.exe")
        self.driver = webdriver.Firefox(service=service, options=options)

    def parse(self, response):
        self.driver.implicitly_wait(5)
         # Llama a la primera función
        yield from self.process_items(response)
        self.driver.implicitly_wait(5)
        # Llama a la segunda función
        yield from self.movimientos_items(response)
        self.driver.implicitly_wait(5)
        # Llama a la tercera función
        yield from self.actuaciones_items(response)


    def process_items(self, response):
        self.driver.get(response.url)
        item_process = ProcesosItem()
        try:
            print("Page is ready!")
            label_element = self.driver.find_element(By.XPATH, '//*[@id="mat-input-1"]')
            label = label_element.send_keys('0968599020001');
            self.driver.find_element(By.XPATH,'/html/body/app-root/app-expel-filtros-busqueda/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/form/div[6]/button[1]').click()

            self.driver.get('https://procesosjudiciales.funcionjudicial.gob.ec/causas')
            for i in range(1, 100):

                try:
                    for j in range(1,5):
                        procesos = self.driver.find_element(By.XPATH, f'/html/body/app-root/app-expel-listado-juicios/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/section/div[2]/div[{i}]/div[{j}]').text
                        if j == 1:
                            item_process['id'] = procesos
                        if j == 2:
                            item_process['fecha'] = procesos
                        if j == 3:
                            item_process['no_proceso'] = procesos
                        if j == 4:
                            item_process['accion_infraccion'] = procesos
                            item_process['table'] = 'procesos'


                        print(item_process, '********imprimir label')

                except:
                    print('********finalizó proceso')
                    break

                yield item_process

        except TimeoutException:

            print("Timeout")


    def movimientos_items(self, response):
        item_movimientos = MovimientosItem()
        try:

            for i in range(1, 100):
                self.driver.get('https://procesosjudiciales.funcionjudicial.gob.ec/causas')

                try:
                    self.driver.implicitly_wait(2)
                    self.driver.find_element(By.XPATH, f'/html/body/app-root/app-expel-listado-juicios/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/section/div[2]/div[{i}]/div[5]/a').click()
                    self.driver.get('https://procesosjudiciales.funcionjudicial.gob.ec/movimientos')
                    self.driver.implicitly_wait(2)
                    id_proceso = self.driver.find_element(By.XPATH, '/html/body/app-root/app-expel-listado-movimientos/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/expel-informacion-busqueda/header/section[5]/section/div[1]/span[1]').text
                    item_movimientos['no_proceso'] = id_proceso
                    id_proceso = self.driver.find_element(By.XPATH, '/html/body/app-root/app-expel-listado-movimientos/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/section/div/div[2]/div/div[1]/span').text
                    item_movimientos['dependencia'] = id_proceso
                    id_proceso = self.driver.find_element(By.XPATH, '/html/body/app-root/app-expel-listado-movimientos/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/section/div/div[2]/div/div[1]/div').text
                    item_movimientos['ciudad'] = id_proceso
                    id_proceso = self.driver.find_element(By.XPATH, '/html/body/app-root/app-expel-listado-movimientos/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/section/div/div[2]/div/div[2]/div/div[2]').text
                    item_movimientos['fecha'] = id_proceso
                    id_proceso = self.driver.find_element(By.XPATH, '/html/body/app-root/app-expel-listado-movimientos/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/section/div/div[2]/div/div[2]/div/div[3]').text
                    item_movimientos['actores'] = id_proceso
                    id_proceso = self.driver.find_element(By.XPATH, '/html/body/app-root/app-expel-listado-movimientos/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/section/div/div[2]/div/div[2]/div/div[4]').text
                    item_movimientos['demandado'] = id_proceso
                    item_movimientos['table'] = 'movimientos'
                    print(item_movimientos)
                    self.driver.find_element(By.XPATH,'/html/body/app-root/app-expel-listado-movimientos/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/expel-informacion-busqueda/header/section[1]/button').click()

                except:
                    print('********finalizó proceso')
                    break

                yield item_movimientos


        except TimeoutException:

            print("Timeout")

    def actuaciones_items(self, response):
        self.driver.implicitly_wait(2)
        item_actuaciones = ActuacionesItem()
        try:
            self.driver.get('https://procesosjudiciales.funcionjudicial.gob.ec/causas')
            for i in range(1, 100):
                self.driver.get('https://procesosjudiciales.funcionjudicial.gob.ec/causas')

                try:
                    self.driver.implicitly_wait(2)
                    self.driver.find_element(By.XPATH, f'/html/body/app-root/app-expel-listado-juicios/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/section/div[2]/div[{i}]/div[5]/a').click()
                    self.driver.get('https://procesosjudiciales.funcionjudicial.gob.ec/movimientos')
                    self.driver.implicitly_wait(2)
                    element = self.driver.find_element(By.XPATH, '/html/body/app-root/app-expel-listado-movimientos/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/section/div/div[2]/div/div[2]/div/div[5]/a')
                    self.driver.execute_script("arguments[0].click();", element)
                    self.driver.get('https://procesosjudiciales.funcionjudicial.gob.ec/actuaciones')
                    self.driver.implicitly_wait(2)

                    for j in range(1, 100):
                        try:
                            self.driver.implicitly_wait(5)
                            item_actuaciones['delito_asunto']  = self.driver.find_element(By.XPATH, '/html/body/app-root/app-expel-listado-actuaciones/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/expel-informacion-busqueda/header/section[5]/section/div[3]/span[1]').text
                            item_actuaciones['no_proceso'] = self.driver.find_element(By.XPATH, '/html/body/app-root/app-expel-listado-actuaciones/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/expel-informacion-busqueda/header/section[5]/section/div[1]/span[1]').text
                            item_actuaciones['actores'] = self.driver.find_element(By.XPATH, '/html/body/app-root/app-expel-listado-actuaciones/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/expel-informacion-busqueda/header/section[5]/section/div[5]/span[1]').text
                            item_actuaciones['demandado'] = self.driver.find_element(By.XPATH, '/html/body/app-root/app-expel-listado-actuaciones/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/expel-informacion-busqueda/header/section[5]/section/div[5]/span[2]').text
                            item_actuaciones['nombre'] = self.driver.find_element(By.XPATH, f'/html/body/app-root/app-expel-listado-actuaciones/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/section[2]/mat-accordion/mat-expansion-panel[{j}]/mat-expansion-panel-header/span[1]/div[1]/span[2]').text
                            item_actuaciones['nombre_archivo'] = self.driver.find_element(By.XPATH, f'/html/body/app-root/app-expel-listado-actuaciones/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/section[2]/mat-accordion/mat-expansion-panel[{j}]/mat-expansion-panel-header/span[1]/div[1]/span[2]').text
                            item_actuaciones['table'] = 'actuaciones'
                            print(item_actuaciones)

                            yield item_actuaciones
                        except:
                            print('********finalizó proceso')
                            break
                    self.driver.find_element(By.XPATH,'/html/body/app-root/app-expel-listado-actuaciones/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/expel-informacion-busqueda/header/section[1]/button').click()
                    self.driver.get('https://procesosjudiciales.funcionjudicial.gob.ec/movimientos')
                    self.driver.implicitly_wait(2)
                    element = self.driver.find_element(By.XPATH, '/html/body/app-root/app-expel-listado-movimientos/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/expel-informacion-busqueda/header/section[1]/button')
                    self.driver.execute_script("arguments[0].click();", element)
                    # self.driver.find_element(By.XPATH,'/html/body/app-root/app-expel-listado-movimientos/expel-sidenav/mat-sidenav-container/mat-sidenav-content/section/expel-informacion-busqueda/header/section[1]/button').click()

                except:
                    print('********finalizó proceso')
                    break



            self.driver.quit()

        except TimeoutException:
            print("Timeout")
