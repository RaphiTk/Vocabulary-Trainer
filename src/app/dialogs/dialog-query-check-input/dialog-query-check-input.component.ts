import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ChoosenUnit } from '../../interfaces/choosen-unit';
import { VocabularyService } from 'src/app/services/vocabulary.service';


@Component({
  selector: 'app-dialog-query-check-input',
  templateUrl: './dialog-query-check-input.component.html',
  styleUrls: ['./dialog-query-check-input.component.css']
})
export class DialogQueryCheckInputComponent {

  resultMessage;
  correct: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogQueryCheckInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
     private vocService: VocabularyService) {
       if(this.checkUserInput(data)) {
         this.correct = true;
        this.resultMessage = "Your information was correct, congratulations";
       } else {
         this.correct = false;
        this.resultMessage = "Sadly, your information was wrong";
       }
    }

  private okClicked(): void {
    this.dialogRef.close(this.correct);
  }

  private correctClicked() : void {
    this.dialogRef.close(true);
  }

  private checkUserInput(data) {
    return data.userInput.toLocaleLowerCase() == data.voc.secondaryLanguage.toLocaleLowerCase();    
  }
}

