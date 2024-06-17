import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { ComunidadComponent } from 'app/modules/landing/comunidad/comunidad.component';
import { comunidadRoutes } from 'app/modules/landing/comunidad/comunidad.routing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FuseCardModule } from '@fuse/components/card';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import { ComunidadService } from 'app/services/comunidad/comunidad.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
    declarations: [
        ComunidadComponent
    ],
    imports     : [
        RouterModule.forChild(comunidadRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatTooltipModule,
        FuseCardModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        TranslocoModule,
        NgApexchartsModule,
        MatDatepickerModule,
        MatMomentDateModule,
        NgxMaterialTimepickerModule,
        MatSlideToggleModule,
        MatListModule,
        MatChipsModule,
        MatAutocompleteModule,
    ],
})
export class ComunidadModule
{
}
