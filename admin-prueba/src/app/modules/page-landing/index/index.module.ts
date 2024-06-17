import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
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
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { indexRoutes } from './index.routing';
import { IndexSevenComponent } from './index.component';
import { AboutComponent } from '../components/about/about.component';
import { AgencyTabComponent } from '../components/agency-tab/agency-tab.component';
import { BlogsComponent } from '../components/blogs/blogs.component';
import { ClientComponent } from '../components/client/client.component';
import { CtaComponent } from '../components/cta/cta.component';
import { GetInTouchComponent } from '../components/get-in-touch/get-in-touch.component';
import { NavLightComponent } from '../components/nav-light/nav-light.component';
import { PricingComponent } from '../components/pricing/pricing.component';
import { ServicesComponent } from '../components/services/services.component';
import { FooterComponent } from '../components/footer/footer.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';



@NgModule({
  declarations: [IndexSevenComponent],
  imports: [
    RouterModule.forChild(indexRoutes),
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
        NavLightComponent,
        AboutComponent,
        ServicesComponent,
        AgencyTabComponent,
        CtaComponent,
        ClientComponent,
        PricingComponent,
        BlogsComponent,
        GetInTouchComponent,
        FooterComponent,
        NgxPageScrollCoreModule.forRoot({ duration: 800 })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class IndexModule { }
