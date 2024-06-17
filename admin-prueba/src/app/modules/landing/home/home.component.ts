import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudiandoService } from 'app/services/estudiando/estudiando.service';


export interface Cliente {
    id: number,
    cedula: string,
    nombres: string,
    direccion: string,
    telefono: string,
    email: string
}
@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LandingHomeComponent
{
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    accountForm: FormGroup;
    clientes: any;
    ELEMENT_DATA: Cliente[] = [];
    displayedColumns: string[] = ['nombres', 'cedula', 'telefono', 'email'];
    columnsToDisplay: string[] = this.displayedColumns.slice();
    data: Cliente[]

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
            cedula: ['', Validators.required],
            nombres: ['', Validators.required],
            direccion: ['', Validators.required],
            telefono: ['', Validators.required],
            email: ['', Validators.required]
        });
            this.traerClientes();
    }

    traerClientes(){
        this._estudiandoService.getClientes().subscribe((clientes:any) =>{
            console.log(clientes)
            this.ELEMENT_DATA = clientes
            this.data = this.ELEMENT_DATA;
        })
    }

    crearClientes(){
        const body = this.accountForm.getRawValue()
        body.telefono = String(body.telefono)
        body.cedula = String(body.cedula)
        console.log(body)
        this._estudiandoService.createClientes(body).subscribe((clientes:any) =>{
             this.accountForm.reset();
             this.ngOnInit();
        })
    }



}
