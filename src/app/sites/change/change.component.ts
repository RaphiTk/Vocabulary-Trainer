import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VocabularyService } from '../../services/vocabulary.service';
import { Vocabulary } from '../../interfaces/vocabulary';
import {MatDialog} from '@angular/material';
import { DialogAddVocabularyComponent } from "../../dialogs/dialog-add-vocabulary/dialog-add-vocabulary.component";


@Component({
  selector: 'app-site-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class SiteChangeComponent implements OnInit {
  unit: string;
  clas: string;
  vocs: Vocabulary[];

  constructor(public vocService: VocabularyService, public router: Router, public route: ActivatedRoute, public dialog: MatDialog) { 
    this.route.params.forEach((params: Params) => {
      if (params['unit'] !== undefined) {
        this.unit = params['unit'];
        console.log("2", this.unit);
      }
      if (params['clas'] !== undefined) {
        this.clas = params['clas'];
        console.log("1", this.clas);
      }
    });
    console.log("3", this.clas, this.unit);
    if (this.clas === undefined || this.clas === null || this.unit === undefined || this.unit === null) {
      router.navigate(["../"]);
    }
  }

  ngOnInit() {
    this.vocService.getVocsByClasAndUnit(this.clas, this.unit)
      .then((vocs)=> this.vocs = vocs);
  }

  addClicked() {
    let voc = {} as Vocabulary;
    voc.unit = this.unit;
    voc.clas = this.clas;
    voc.failuresCount = 0;
    voc.tries = 0;
    
    const dialogRef = this.dialog.open(DialogAddVocabularyComponent, {
      width: '250px',
      data: {voc}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.vocService.addVocabulary(result).then((newVocs) => this.vocs.push(newVocs[0])/*console.log(newId)this.vocService.getVocabularybyId(newId).then((newVoc) => this.vocs.push(newVoc))*/);
    });
    
  }

}