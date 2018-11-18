import { Component, OnInit, ViewChild } from '@angular/core';
import { VarPrimaryLanguageComponent } from '../var-primary-language/var-primary-language.component';
import { LocalStorageNamespace } from '../local-storage.namespace';

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.css']
})
export class SiteSettingsComponent implements OnInit {
  @ViewChild("VarPrimaryLanguage") varPrimaryLanguageComponent;
  @ViewChild("VarSecondaryLanguage") varSecondaryLanguageComponent;

  constructor() { }

  ngOnInit() {
    
  }

  saveButtonPressed() {
    let newPrimaryLanguage: string = this.varPrimaryLanguageComponent.getPrimaryLanguage();
    let newSecondaryLanguage: string = this.varSecondaryLanguageComponent.getSecondaryLanguage();
    LocalStorageNamespace.newPrimaryLanguage(newPrimaryLanguage);
    LocalStorageNamespace.newSecondaryLanguage(newSecondaryLanguage);
  }

}
