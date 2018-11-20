import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,} from '@angular/material';
import {RestApiService} from './rest-api.service';
import { SiteSearchComponent } from './site-search/site-search.component';
import { SiteMenuComponent } from './site-menu/site-menu.component';
import { SiteQueryComponent } from './site-query/site-query.component';
import { SiteChangeComponent } from './site-change/site-change.component';
import { SiteSettingsComponent } from './site-settings/site-settings.component';
import { LogoInCornerComponent } from './logo-in-corner/logo-in-corner.component';
import { ButtonBackComponent } from './button-back/button-back.component';
import { VarPrimaryLanguageComponent } from './var-primary-language/var-primary-language.component';
import { VarSecondaryLanguageComponent } from './var-secondary-language/var-secondary-language.component';
import { DialogChangeChooseUnitComponent } from './dialogs/dialog-change-choose-unit/dialog-change-choose-unit.component';
import { DialogAddVocabularyComponent } from './dialogs/dialog-add-vocabulary/dialog-add-vocabulary.component';
import { InitVocabularyService } from './vocabulary.service';

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [MatButtonModule, MatFormFieldModule, MatCheckboxModule],
  declarations: [
    AppComponent,
    SiteMenuComponent,
    SiteQueryComponent,
    SiteSearchComponent,
    SiteChangeComponent,
    SiteSettingsComponent,
    LogoInCornerComponent,
    ButtonBackComponent,
    VarPrimaryLanguageComponent,
    VarSecondaryLanguageComponent,
    DialogChangeChooseUnitComponent,
    DialogAddVocabularyComponent
  ],
  providers: [RestApiService, {
    provide: APP_INITIALIZER,
    useFactory: InitVocabularyService,
    multi: true,
    deps: [/* your dependencies */]
}],
  bootstrap: [AppComponent],
  entryComponents: [DialogChangeChooseUnitComponent, DialogAddVocabularyComponent]
})
export class AppModule { }
