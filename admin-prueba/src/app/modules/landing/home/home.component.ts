import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudiandoService } from 'app/services/estudiando/estudiando.service';


export interface Autor {
    idAutor: number,
    Autor: string,
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
    ELEMENT_DATA: Autor[] = [];
    displayedColumns: string[] = ['idAutor', 'Autor'];
    columnsToDisplay: string[] = this.displayedColumns.slice();
    data: Autor[]

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
            Autor: ['', Validators.required],
        });
            this.traerAutores();
    }

    traerAutores(){
        /* this._estudiandoService.getAutores().subscribe((autores:any) =>{
            console.log(autores)
            this.ELEMENT_DATA = autores
            this.data = this.ELEMENT_DATA;
        }) */
       const axios = require('axios');

        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://54.158.19.237:8001/autores',
          headers: { }
        };

        axios.request(config)
        .then((response) => {
          console.log(response.data);
          this.ELEMENT_DATA = response.data
        this.data = this.ELEMENT_DATA;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    crearAutor(){
        const body = this.accountForm.getRawValue()
        console.log(body)
        this._estudiandoService.createAutor(body).subscribe((autor:any) =>{
             this.accountForm.reset();
             this.ngOnInit();
        })
    }



}
