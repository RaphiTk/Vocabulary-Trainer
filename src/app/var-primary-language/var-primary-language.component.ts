import { Component, OnInit } from '@angular/core';
import { LocalStorageNamespace} from '../local-storage.namespace';

@Component({
  selector: 'app-var-primary-language',
  templateUrl: './var-primary-language.component.html',
  styleUrls: ['./var-primary-language.component.css']
})
export class VarPrimaryLanguageComponent implements OnInit {
  private primaryLanguage: string;

  constructor() { }

  ngOnInit() {
    this.primaryLanguage = LocalStorageNamespace.getPrimaryLanguage();
    document.addEventListener(LocalStorageNamespace.localStoragePrimaryLanguageKey, function(e) {
      this.primaryLanguage = LocalStorageNamespace.getPrimaryLanguage();
    });
  }

  /**
   * getPrimaryLanguage
   */
  public getPrimaryLanguage() {
    return document.getElementById("primaryLanguageText").innerHTML;
  }

}
