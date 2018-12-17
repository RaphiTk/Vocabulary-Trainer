import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-dialog-change-remove-bottom-sheet',
  templateUrl: './dialog-change-remove-bottom-sheet.component.html',
  styleUrls: ['./dialog-change-remove-bottom-sheet.component.css']
})
export class DialogChangeRemoveBottomSheetComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<DialogChangeRemoveBottomSheetComponent>) {}

  deleteVoc(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  editVoc(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
