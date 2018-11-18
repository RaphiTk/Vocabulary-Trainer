import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {HttpClientModule} from '@angular/common/http';
import {RestApiService} from './rest-api.service';
import { SiteSearchComponent } from './site-search/site-search.component';
import { SiteMenuComponent } from './site-menu/site-menu.component';
import { SiteQueryComponent } from './site-query/site-query.component';
import { SiteChangeComponent } from './site-change/site-change.component';
import { SiteSettingsComponent } from './site-settings/site-settings.component';
import { LogoInCornerComponent } from './logo-in-corner/logo-in-corner.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteMenuComponent,
    SiteQueryComponent,
    SiteSearchComponent,
    SiteChangeComponent,
    SiteSettingsComponent,
    LogoInCornerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
