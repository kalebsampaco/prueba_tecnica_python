/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstudiandoService } from 'app/services/estudiando/estudiando.service';
import { map, Observable, startWith } from 'rxjs';

export interface Venta {
    id: number,
    consecutivo: string,
    fecha: string,
    cliente_id: number,
    total_venta: number,
}

export interface Cliente {
    id: number,
    cedula: string,
    nombres: string,
    direccion: string,
    telefono: string,
    email: string
}

export interface Producto {
    id: number,
    codigo: string,
    nombre: string,
    valor_venta: number,
    iva: boolean,
    porcentaje: number
}
@Component({
    selector     : 'landing-estudiando',
    templateUrl  : './estudiando.component.html',
    styleUrls: ['./estudiando.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EstudiandoComponent implements OnInit
{
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    accountForm: FormGroup;
    ELEMENT_DATA: Venta[] = [];
    displayedColumns: string[] = ['consecutivo', 'fecha', 'cliente_id', 'total_venta'];
    columnsToDisplay: string[] = this.displayedColumns.slice();
    data: Venta[];
    clientes:Cliente[];
    productos: Producto[];
    clientSelected: Cliente;
    myControl = new FormControl();
    myControl1 = new FormControl();
    filteredOptions: Observable<Cliente[]>;
    filteredOptions1: Observable<Producto[]>;
    selectedCliente: Cliente | null = null;

    /**
     * Constructor
     */
    constructor(
        changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
        private _formBuilder: FormBuilder,
        private _estudiandoService: EstudiandoService,
    )
    {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {

        // Create the form
        this.accountForm = this._formBuilder.group({
            consecutivo: ['', Validators.required],
            fecha: ['', Validators.required],
            cliente_id: [0, Validators.required],
            total_venta: [0, Validators.required],
            productos: [ [], Validators.required],
            valor_producto: [0]
        });
            this.traerVentas();
            this.traerClientes();
            this.traerProductos()

            this.filteredOptions = this.myControl.valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value)),
            );

            this.filteredOptions1 = this.myControl1.valueChanges.pipe(
                startWith(''),
                map(value => this._filter1(value)),
            );
    }

    private _filter(value: string): Cliente[] {
        const filterValue = this._normalizeValue(value);
        return this.clientes?.filter(option => this._normalizeValue(option.nombres).includes(filterValue));
      }

      private _filter1(value: string): Producto[] {
        const filterValue = this._normalizeValue(value);
        return this.productos?.filter(option => this._normalizeValue(option.nombre).includes(filterValue));
      }

      private _normalizeValue(value: any): string {
        return (typeof value === 'string' ? value.toLowerCase() : '');
      }

      displayFn(cliente: Cliente): string {
        return cliente && cliente.nombres ? cliente.nombres : '';
      }

      displayFn1(prod: Producto): string {
        return prod && prod.nombre ? prod.nombre : '';
      }

    traerVentas(){
        this._estudiandoService.getVentas().subscribe((venta:any) =>{
            console.log(venta)
            this.ELEMENT_DATA = venta
            this.data = this.ELEMENT_DATA;
        })
    }

     traerClientes(): void {
        this._estudiandoService.getClientes().subscribe((clientes: Cliente[]) => {
            console.log(clientes);
            this.clientes = clientes;
            this.myControl.enable();
        });
    }

    traerProductos(){
        this._estudiandoService.getProductos().subscribe((prod:any) =>{
            console.log(prod)
            this.productos = prod
            this.myControl1.enable();
        })
    }

    crearProducto(){
        const body = this.accountForm.getRawValue()
        const cli = this.myControl.value;
        const prod = this.myControl1.value;
        body.fecha = new Date().toISOString();
        body.cliente_id = cli.id
        body.productos.push({
            id: prod.id,
            valor_producto: prod.valor_venta,
            iva:prod.iva,
            iva_calculo: prod.porcentaje
        });
        body.valor_producto = prod.valor_venta
        console.log(body)
        this._estudiandoService.registerVenta(body).subscribe((prod:any) =>{
             this.myControl.reset();
             this.myControl1.reset();
             this.ngOnInit();
        })
    }
}
