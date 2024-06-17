import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComunidadService } from 'app/services/comunidad/comunidad.service';
import { EstudiandoService } from 'app/services/estudiando/estudiando.service';
import { WindowSizeService } from 'app/services/video/video.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [ComunidadService, EstudiandoService, WindowSizeService]
})
export class SharedModule
{
}
