/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudiandoService } from 'app/services/estudiando/estudiando.service';

export interface Libro {
    id: number,
    titulo: string,
    fecha_publicacion: string,
    Autor: string,
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
    ELEMENT_DATA: Libro[] = [];
    displayedColumns: string[] = ['id', 'titulo', 'fecha_publicacion', 'Autor'];
    columnsToDisplay: string[] = this.displayedColumns.slice();
    data: Libro[];

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
            titulo: ['', Validators.required],
            fecha_publicacion: ['', Validators.required],
            Autor: ['', Validators.required],
        });

    }





}
