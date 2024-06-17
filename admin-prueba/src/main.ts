import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { AppModule } from 'app/app.module';
import { IndexSevenComponent } from 'app/modules/page-landing/index/index.component';
import { IndexModule } from 'app/modules/page-landing/index/index.module';
import { register as registerSwiperElements } from 'swiper/element/bundle';

if ( environment.production )
{
    enableProdMode();
}

registerSwiperElements();

platformBrowserDynamic().bootstrapModule(AppModule)
                        .catch(err => console.error(err));
