import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VocabularyDbService } from '../../services/vocabulary-db.service';
import { IVocabulary, Vocabulary } from '../../interfaces/vocabulary';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { DialogAddVocabularyComponent } from "../../dialogs/dialog-add-vocabulary/dialog-add-vocabulary.component";
import { DialogChangeRemoveBottomSheetComponent } from "../../dialogs/dialog-change-remove-bottom-sheet/dialog-change-remove-bottom-sheet.component";

@Component({
  selector: 'app-site-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class SiteChangeComponent implements OnInit {
  unit: string;
  clas: string;
  vocs: Vocabulary[];

  constructor(public vocService: VocabularyDbService, public router: Router, public route: ActivatedRoute, public dialog: MatDialog, public snackBar: MatSnackBar, private bottomSheet: MatBottomSheet) { 
    this.route.params.forEach((params: Params) => {
      if (params['unit'] !== undefined) {
        this.unit = params['unit'];
      }
      if (params['clas'] !== undefined) {
        this.clas = params['clas'];
      }
    });
    if (this.clas === undefined || this.clas === null || this.unit === undefined || this.unit === null) {
      router.navigate(["../"]);
    }
  }

  ngOnInit() {
    this.vocService.getVocsFromOneUnit(this.clas, this.unit)
      .then((vocs)=> this.vocs = Vocabulary.createCorrectReferences(vocs));
  }

  vocPressed(voc) {
    const bottomSheetRef = this.bottomSheet.open(DialogChangeRemoveBottomSheetComponent, {
      data: voc
    });

    bottomSheetRef.instance.promise.then(deleted => {
      if (deleted || (!deleted && (this.clas !== voc.clas || this.unit !== voc.unit)))
        this.vocs.splice(this.vocs.indexOf(voc), 1);

    });
  }

  addClicked() {
    let voc = {} as IVocabulary;
    voc.unit = this.unit;
    voc.clas = this.clas;
    voc.failuresCount = 0;
    voc.tries = 0;
    
    const dialogRef = this.dialog.open(DialogAddVocabularyComponent, {
      width: '250px',
      data: voc
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.vocService.addVocabulary(result).then((newVocs) => this.vocs.push(Vocabulary.createCorrectReference(newVocs[0])));
        this.snackBar.open("Vocabulary successfully added", null, {duration: 2000})
      }
    });
  }
  
}