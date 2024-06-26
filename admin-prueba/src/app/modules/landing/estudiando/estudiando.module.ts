import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { FuseCardModule } from '@fuse/components/card';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { EstudiandoComponent } from './estudiando.component';
import { EstudiandoRoutes } from './estudiando.routing';

@NgModule({
    declarations: [
        EstudiandoComponent
    ],
    imports     : [
        RouterModule.forChild(EstudiandoRoutes),
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
        MatCardModule,
        MatExpansionModule,
        YouTubePlayerModule,
        MatAutocompleteModule
    ]
})
export class LandingEstudiandoModule
{
}
