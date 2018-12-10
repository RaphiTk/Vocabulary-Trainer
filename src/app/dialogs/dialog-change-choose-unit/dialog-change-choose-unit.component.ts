import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ChoosenUnit } from '../../interfaces/choosen-unit';
import { VocabularyService } from 'src/app/services/vocabulary.service';

@Component({
  selector: 'app-dialog-change-choose-unit',
  templateUrl: './dialog-change-choose-unit.component.html',
  styleUrls: ['./dialog-change-choose-unit.component.css']
})
export class DialogChangeChooseUnitComponent {
  clasOptions = [{}];
  unitOptions = [{}];

  constructor(
    public dialogRef: MatDialogRef<DialogChangeChooseUnitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChoosenUnit,
     private vocService: VocabularyService) {
      vocService.getClases().then((classes) => {
        this.clasOptions = classes;
      }).catch(err => console.log("ERR", err));
    }

  cancelClicked(): void {
    this.dialogRef.close();
  }

  okClicked(): void {
    this.dialogRef.close(this.data);
  }

  clasChanged(): void {
    this.vocService.getUnits(this.data.clas).then((units) => {
      this.unitOptions = units;
    }).catch(err => console.log("ERR", err));
  }
}
