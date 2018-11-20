import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { VocabularyWithOutKey } from 'src/app/interfaces/vocabulary';

@Component({
  selector: 'app-dialog-add-vocabulary',
  templateUrl: './dialog-add-vocabulary.component.html',
  styleUrls: ['./dialog-add-vocabulary.component.css']
})
export class DialogAddVocabularyComponent {
  

  constructor(public dialogRef: MatDialogRef<DialogAddVocabularyComponent>, @Inject(MAT_DIALOG_DATA) public data) {  }

  cancelClicked(): void {
    this.dialogRef.close();
  }

  okClicked(): void {
    this.dialogRef.close(this.data.voc);
  }
}
