/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudiandoService } from 'app/services/estudiando/estudiando.service';

export interface Categoria {
    idCategoria: number,
    categoria: string,
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
    ELEMENT_DATA: Categoria[] = [];
    displayedColumns: string[] = ['idCategoria', 'categoria'];
    columnsToDisplay: string[] = this.displayedColumns.slice();
    data: Categoria[]

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
            categoria: ['', Validators.required]
        });
            this.traerCategorias();
    }

    traerCategorias(){
        this._estudiandoService.getCategorias().subscribe((cat:any) =>{
            console.log(cat)
            this.ELEMENT_DATA = cat
            this.data = this.ELEMENT_DATA;
        })

        /* const axios = require('axios');

        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://54.158.19.237:8001/categoria',
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
        }); */
    }

    crearCategoria(){
        const body = this.accountForm.getRawValue()
        console.log(body)
        this._estudiandoService.createCategoria(body).subscribe((cat:any) =>{
             this.accountForm.reset();
             this.ngOnInit();
        })
    }


}
