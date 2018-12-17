import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Vocabulary } from 'src/app/interfaces/vocabulary';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { VocabularyService } from 'src/app/services/vocabulary.service';

@Component({
  selector: 'app-dialog-change-remove-bottom-sheet',
  templateUrl: './dialog-change-remove-bottom-sheet.component.html',
  styleUrls: ['./dialog-change-remove-bottom-sheet.component.css']
})
export class DialogChangeRemoveBottomSheetComponent {
  dialogRef: MatDialogRef<DialogConfirmationComponent>;

  constructor(public snackbar: MatSnackBar, private bottomSheetRef: MatBottomSheetRef<DialogChangeRemoveBottomSheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public voc: any, public confirmDialog: MatDialog, public vocService: VocabularyService) {
    this.voc = this.voc.voc;
  }

  deleteVoc(event: MouseEvent): void {

    this.dialogRef = this.confirmDialog.open(DialogConfirmationComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.bottomSheetRef.dismiss(true);
        event.preventDefault();
        this.vocService.deleteVocabulary(this.voc).then((obj) => {
          this.snackbar.open("Vocabulary successfully deleted" , null, {duration:2000});
        }).catch(err => this.snackbar.open(JSON.parse(err) , null, {duration:2000}));
      }
      this.dialogRef = null;
    });
    
  }

  editVoc(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
