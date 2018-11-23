import { Component, OnInit, ViewChild } from '@angular/core';
import { VarPrimaryLanguageComponent } from '../../frames/var-primary-language/var-primary-language.component';
import { LocalStorageNamespace } from '../../services/local-storage.namespace';

@Component({
  selector: 'app-site-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
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
