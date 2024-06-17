/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudiandoService } from 'app/services/estudiando/estudiando.service';

export interface Producto {
    id: number,
    codigo: string,
    nombre: string,
    valor_venta: number,
    iva: boolean,
    porcentaje: number
}

@Component({
    selector     : 'landing-comunidad',
    templateUrl  : './comunidad.component.html',
    encapsulation: ViewEncapsulation.None,
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComunidadComponent implements OnInit
{
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    accountForm: FormGroup;
    ELEMENT_DATA: Producto[] = [];
    displayedColumns: string[] = ['codigo', 'nombre', 'valor_venta', 'iva', 'porcentaje'];
    columnsToDisplay: string[] = this.displayedColumns.slice();
    data: Producto[]

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
            codigo: ['', Validators.required],
            nombre: ['', Validators.required],
            valor_venta: ['', Validators.required],
            iva: [false, Validators.required],
            porcentaje: [0]
        });
            this.traerProductos();
    }

    traerProductos(){
        this._estudiandoService.getProductos().subscribe((prod:any) =>{
            console.log(prod)
            this.ELEMENT_DATA = prod
            this.data = this.ELEMENT_DATA;
        })
    }

    crearProducto(){
        const body = this.accountForm.getRawValue()
        console.log(body)
        this._estudiandoService.createProduct(body).subscribe((prod:any) =>{
             this.accountForm.reset();
             this.ngOnInit();
        })
    }


}
