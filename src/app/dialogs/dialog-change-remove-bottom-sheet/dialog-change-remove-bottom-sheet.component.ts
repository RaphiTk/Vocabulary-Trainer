import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Vocabulary } from 'src/app/interfaces/vocabulary';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { VocabularyDbService } from 'src/app/services/vocabulary-db.service';
import { DialogEditVocabularyComponent } from '../dialog-edit-vocabulary/dialog-edit-vocabulary.component';

@Component({
  selector: 'app-dialog-change-remove-bottom-sheet',
  templateUrl: './dialog-change-remove-bottom-sheet.component.html',
  styleUrls: ['./dialog-change-remove-bottom-sheet.component.css']
})
export class DialogChangeRemoveBottomSheetComponent {
  public promise;
  private resolve;

  constructor(public snackBar: MatSnackBar, private bottomSheetRef: MatBottomSheetRef<DialogChangeRemoveBottomSheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public voc: any, public dialog: MatDialog, public vocService: VocabularyDbService) {
    let _this = this
    this.promise = new Promise(function(resolve, reject) {  
      _this.resolve = resolve;
    });
  }

  deleteVoc(event: MouseEvent): void {
    let dialogRef = this.dialog.open(DialogConfirmationComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.vocService.deleteVocabulary(this.voc).then((obj) => {
          this.snackBar.open("Vocabulary successfully deleted" , null, {duration:2000});
          this.resolve(true);
        }).catch(err => this.snackBar.open(JSON.parse(err) , null, {duration:2000}));
      }
      dialogRef = null;
    });
    this.bottomSheetRef.dismiss();
  }

  editVoc(event: MouseEvent): void {
    let dialogRef = this.dialog.open(DialogEditVocabularyComponent, {
      width: '250px',
      data: this.voc
    });

    dialogRef.afterClosed().subscribe(result => {
      this.resolve(false);
      dialogRef = null;
    });

    this.bottomSheetRef.dismiss();    
  }
}
