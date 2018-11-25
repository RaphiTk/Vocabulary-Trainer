import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { VarPrimaryLanguageComponent } from '../../frames/var-primary-language/var-primary-language.component';
import { LocalStorageNamespace } from '../../services/local-storage.namespace';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Vocabulary } from 'src/app/interfaces/vocabulary';

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

  private getFile() {
    document.getElementById("readFile").click();
  }

  private readFile(event)  {
    const dataType = (<any>document.getElementById("readFile")).files.item(0).type;
    if (dataType === "application/json") {
      let fr = new FileReader();
      fr.onload = function(e) {
        console.log(fr.result);
        let vocs:any[] = JSON.parse(<string>fr.result);
        console.log(vocs);
        let vocService: VocabularyService = new VocabularyService();
        for(let voc of vocs) {
          let newVoc: Vocabulary = new Vocabulary(voc.id, voc.Versuche, voc.Fehlversuche, voc.Klasse, voc.Unit, voc.Wort_Deutsch, voc.Wort_Englisch);
          vocService.addVocabulary(newVoc);
        }
      }
      fr.readAsText(event.target.files[0]);
      console.log(event.target);
    }
  }
}
