import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ChoosenUnit } from '../../interfaces/choosen-unit';

@Component({
  selector: 'app-dialog-change-choose-unit',
  templateUrl: './dialog-change-choose-unit.component.html',
  styleUrls: ['./dialog-change-choose-unit.component.css']
})
export class DialogChangeChooseUnitComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogChangeChooseUnitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChoosenUnit) {}

  cancelClicked(): void {
    this.dialogRef.close();
  }

  okClicked(): void {
    this.dialogRef.close(this.data);
  }
}
