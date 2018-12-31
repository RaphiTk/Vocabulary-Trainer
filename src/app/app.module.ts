import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatAutocompleteModule,  MatBadgeModule,  MatBottomSheetModule,  MatButtonToggleModule,  MatCardModule,  MatChipsModule,  MatDatepickerModule,  MatDialogModule,  MatDividerModule,  MatExpansionModule,  MatGridListModule,  MatIconModule,  MatInputModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatPaginatorModule,  MatProgressBarModule,  MatProgressSpinnerModule,  MatRadioModule,  MatRippleModule,  MatSelectModule,  MatSidenavModule,  MatSliderModule,  MatSlideToggleModule,  MatSnackBarModule,  MatSortModule,  MatStepperModule,  MatTableModule,  MatTabsModule,  MatToolbarModule,  MatTooltipModule,  MatTreeModule,} from '@angular/material';

import { RestApiService } from './services/rest-api.service';
import { SiteSearchComponent } from './sites/search/search.component';
import { SiteMenuComponent } from './sites/menu/menu.component';
import { SiteQueryComponent } from './sites/query/query.component';
import { SiteChangeComponent } from './sites/change/change.component';
import { SiteSettingsComponent } from './sites/settings/settings.component';
import { LogoInCornerComponent } from './frames/logo-in-corner/logo-in-corner.component';
import { ButtonBackComponent } from './frames/button-back/button-back.component';
import { VarPrimaryLanguageComponent } from './frames/var-primary-language/var-primary-language.component';
import { VarSecondaryLanguageComponent } from './frames/var-secondary-language/var-secondary-language.component';
import { DialogChangeChooseUnitComponent } from './dialogs/dialog-change-choose-unit/dialog-change-choose-unit.component';
import { DialogAddVocabularyComponent } from './dialogs/dialog-add-vocabulary/dialog-add-vocabulary.component';
import { DialogQueryChooseUnitComponent } from './dialogs/dialog-query-choose-unit/dialog-query-choose-unit.component';
import { DialogQueryCheckInputComponent } from './dialogs/dialog-query-check-input/dialog-query-check-input.component';
import { DialogQueryFinalResultComponent } from './dialogs/dialog-query-final-result/dialog-query-final-result.component';
import {DialogChangeRemoveBottomSheetComponent} from './dialogs/dialog-change-remove-bottom-sheet/dialog-change-remove-bottom-sheet.component';
import { DialogConfirmationComponent } from './dialogs/dialog-confirmation/dialog-confirmation.component';
import { DialogEditVocabularyComponent } from './dialogs/dialog-edit-vocabulary/dialog-edit-vocabulary.component'
//import { InitVocabularyService } from './services/vocabulary.service';
import { AuthService } from './services/auth.service';
import { CallbackComponent } from './frames/callback/callback.component';
import { LoadingSpinnerComponent } from './frames/loading-spinner/loading-spinner.component';
import { FullscreenOverlayContainer, OverlayContainer} from '@angular/cdk/overlay';

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
    DialogAddVocabularyComponent,
    DialogQueryChooseUnitComponent,
    DialogQueryCheckInputComponent,
    DialogQueryFinalResultComponent,
    DialogChangeRemoveBottomSheetComponent,
    DialogConfirmationComponent,
    DialogEditVocabularyComponent,
    CallbackComponent,
    LoadingSpinnerComponent 
  ],
  providers: [RestApiService, AuthService, {provide: LoadingSpinnerComponent, useClass: FullscreenOverlayContainer}/*, {
    provide: APP_INITIALIZER,
    useFactory: InitVocabularyService,
    multi: true,
    deps: [ ]
}*/],
  bootstrap: [AppComponent],
  entryComponents: [DialogChangeChooseUnitComponent, DialogAddVocabularyComponent, DialogQueryChooseUnitComponent, DialogQueryCheckInputComponent, DialogQueryFinalResultComponent, DialogChangeRemoveBottomSheetComponent, DialogConfirmationComponent, DialogEditVocabularyComponent, LoadingSpinnerComponent]
})
export class AppModule { }
