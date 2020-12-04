import { Component, OnInit, Inject } from '@angular/core';
import { Vocabulary } from 'src/app/interfaces/vocabulary';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VocabularyService } from 'src/app/services/vocabulary.service';

@Component({
  selector: 'app-dialog-edit-vocabulary',
  templateUrl: './dialog-edit-vocabulary.component.html',
  styleUrls: ['./dialog-edit-vocabulary.component.css']
})
export class DialogEditVocabularyComponent {
  private data;
  private saved: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEditVocabularyComponent>,
    @Inject(MAT_DIALOG_DATA) public voc: Vocabulary,
     private vocService: VocabularyService, private snackBar: MatSnackBar) {  
       this.data = voc.createNewObject();
       dialogRef.beforeClosed().subscribe(res => {
          if (!this.saved)
            this.voc.setNewValues(this.data)
       })
  }

  cancelClicked(): void {
    this.dialogRef.close();
  }

  editClicked(): void {
    this.saved = true;
    this.vocService.editVocabulary(this.voc).then((obj) => {
      this.dialogRef.close(true);
      this.snackBar.open("Vocabulary successfully edited" , null, {duration:2000});
    }).catch(err => {
      this.dialogRef.close(false);
      console.log(err)
      this.snackBar.open("Failed to edit Vocabulary" , null, {duration:2000})
    });
  }
}
