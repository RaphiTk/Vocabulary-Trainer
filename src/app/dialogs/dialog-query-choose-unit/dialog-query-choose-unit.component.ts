import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ChoosenUnit } from '../../interfaces/choosen-unit';
import { VocabularyService } from 'src/app/services/vocabulary.service';
@Component({
  selector: 'app-dialog-query-choose-unit',
  templateUrl: './dialog-query-choose-unit.component.html',
  styleUrls: ['./dialog-query-choose-unit.component.css']
})
export class DialogQueryChooseUnitComponent {
  clasOptions = [{}];
  unitOptions = [{}];
  data: ChoosenUnit = {} as ChoosenUnit;
  allowUnitChange = false;

  constructor(
    public dialogRef: MatDialogRef<DialogQueryChooseUnitComponent>,
    private vocService: VocabularyService) {
      vocService.getClases().then((classes) => {
        this.clasOptions = classes;
      }).catch(err => console.log("ERR", err));
  }
    
    clasChanged(): void {
      this.vocService.getUnits(this.data.clas).then((units) => {
        this.allowUnitChange = true;
        this.unitOptions = units;
      }).catch(err => console.log("ERR", err));
    }

    cancelClicked(): void {
      this.dialogRef.close();
    }
  
    okClicked(): void {
      this.dialogRef.close(this.data);
    }

}
