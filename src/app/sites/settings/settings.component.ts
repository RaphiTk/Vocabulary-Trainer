import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { VarPrimaryLanguageComponent } from '../../frames/var-primary-language/var-primary-language.component';
import { LocalStorageNamespace } from '../../services/local-storage.namespace';
import { VocabularyService } from 'src/app/services/vocabulary.service';
import { Vocabulary } from 'src/app/interfaces/vocabulary';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { DialogQueryChooseUnitComponent } from 'src/app/dialogs/dialog-query-choose-unit/dialog-query-choose-unit.component'

@Component({
  selector: 'app-site-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SiteSettingsComponent implements OnInit {
  @ViewChild("VarPrimaryLanguage") varPrimaryLanguageComponent;
  @ViewChild("VarSecondaryLanguage") varSecondaryLanguageComponent;

  constructor(public snackBar: MatSnackBar, public auth: AuthService, private dialog: MatDialog, private vocService: VocabularyService ) { }

  ngOnInit() {
    var _this = this;
    document.getElementById("importFile").onchange = function(ev) {
      _this.importFile(ev);
    }
    
  }

  saveButtonPressed() {
    let newPrimaryLanguage: string = this.varPrimaryLanguageComponent.getPrimaryLanguage();
    let newSecondaryLanguage: string = this.varSecondaryLanguageComponent.getSecondaryLanguage();
    LocalStorageNamespace.newPrimaryLanguage(newPrimaryLanguage);
    LocalStorageNamespace.newSecondaryLanguage(newSecondaryLanguage);
    this.snackBar.open("Languages successfully saved" , null, {duration:2000});
  }

  chooseFileToImport() {
    document.getElementById("importFile").click();
  }

  importFile(event)  {
    const dataType = (<any>document.getElementById("importFile")).files.item(0).type;
    let _this = this;
    if (dataType === "application/json") {
      let fr = new FileReader();
      fr.onload = function(e) {
        let vocs:any[] = JSON.parse(<string>fr.result);
        let vocService: VocabularyService = new VocabularyService();
        for(let voc of vocs) {
          let newVoc;
          if (voc.Klasse != null) {
            newVoc = new Vocabulary(voc.id, voc.Versuche, voc.Fehlversuche, voc.Klasse, voc.Unit, voc.Wort_Deutsch, voc.Wort_Englisch);
          } else {
            newVoc = new Vocabulary(voc.id, voc.tries, voc.failuresCount, voc.clas, voc.unit, voc.primaryLanguage, voc.secondaryLanguage);
          }
          vocService.addVocabulary(newVoc);
        }
        let message = vocs.length + " Vocabularies successfully saved";
        _this.snackBar.open(message , null, {duration:2000});
      }
      fr.readAsText(event.target.files[0]);
    }
  }

  chooseVocabularyToExport() {
    const dialogRef = this.dialog.open(DialogQueryChooseUnitComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result.unit === undefined || result.unit === null) {
          this.vocService.getVocsFromOneClas(result.clas).then((vocResult:Vocabulary[]) => {this.startDownload(vocResult) });
        } else {
          this.vocService.getVocsFromOneUnit(result.clas, result.unit).then((vocResult:Vocabulary[]) => {this.startDownload(vocResult)})
        }
      }
    });
  }

  startDownload(vocs: Vocabulary[]) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vocs));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", vocs[0].clas + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  loginButtonPressed() {
    //
    this.auth.login();
  }
}
