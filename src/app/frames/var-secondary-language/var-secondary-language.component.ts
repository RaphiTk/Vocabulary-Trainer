import { Component, OnInit } from '@angular/core';
import { LocalStorageNamespace} from '../../services/local-storage.namespace';


@Component({
  selector: 'app-var-secondary-language',
  templateUrl: './var-secondary-language.component.html',
  styleUrls: ['./var-secondary-language.component.css']
})
export class VarSecondaryLanguageComponent implements OnInit {
  private secondaryLanguage: string;

  constructor() { }

  ngOnInit() {
    this.secondaryLanguage = LocalStorageNamespace.getSecondaryLanguage();
    document.addEventListener(LocalStorageNamespace.localStorageSecondaryLanguageKey, function(e) {
      this.secondaryLanguage = LocalStorageNamespace.getSecondaryLanguage();
    });
  }

  /**
   * getSecondaryLanguage
   */
  public getSecondaryLanguage() {
    return document.getElementById("secondaryLanguageText").innerHTML;
  }
}
