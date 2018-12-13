import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { VarPrimaryLanguageComponent } from '../../frames/var-primary-language/var-primary-language.component';
import { LocalStorageNamespace } from '../../services/local-storage.namespace';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Vocabulary } from 'src/app/interfaces/vocabulary';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-site-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SiteSettingsComponent implements OnInit {
  @ViewChild("VarPrimaryLanguage") varPrimaryLanguageComponent;
  @ViewChild("VarSecondaryLanguage") varSecondaryLanguageComponent;

  constructor(public snackbar: MatSnackBar) { }

  ngOnInit() {
    var _this = this;
    document.getElementById("readFile").onchange = function(ev) {
      _this.readFile(ev);
    }
    
  }

  saveButtonPressed() {
    let newPrimaryLanguage: string = this.varPrimaryLanguageComponent.getPrimaryLanguage();
    let newSecondaryLanguage: string = this.varSecondaryLanguageComponent.getSecondaryLanguage();
    LocalStorageNamespace.newPrimaryLanguage(newPrimaryLanguage);
    LocalStorageNamespace.newSecondaryLanguage(newSecondaryLanguage);
    this.snackbar.open("Languages successfully saved" , null, {duration:2000});
  }

  getFile() {
    document.getElementById("readFile").click();
  }

  readFile(event)  {
    const dataType = (<any>document.getElementById("readFile")).files.item(0).type;
    let _this = this;
    if (dataType === "application/json") {
      let fr = new FileReader();
      fr.onload = function(e) {
        let vocs:any[] = JSON.parse(<string>fr.result);
        let vocService: VocabularyService = new VocabularyService();
        for(let voc of vocs) {
          let newVoc: Vocabulary = new Vocabulary(voc.id, voc.Versuche, voc.Fehlversuche, voc.Klasse, voc.Unit, voc.Wort_Deutsch, voc.Wort_Englisch);
          vocService.addVocabulary(newVoc);
        }
        let message = vocs.length + " Vocabularies successfully saved";
        _this.snackbar.open(message , null, {duration:2000});
      }
      fr.readAsText(event.target.files[0]);
    }
  }
}
