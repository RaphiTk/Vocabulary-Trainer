import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material';
import { DialogChangeChooseUnitComponent } from '../../dialogs/dialog-change-choose-unit/dialog-change-choose-unit.component';
import { Router } from '@angular/router';
import { DialogQueryChooseUnitComponent } from 'src/app/dialogs/dialog-query-choose-unit/dialog-query-choose-unit.component';

@Component({
  selector: 'app-site-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class SiteMenuComponent implements OnInit {

  constructor(public dialog: MatDialog, public router: Router) {}

  ngOnInit() {

  }

  changeButtonPressed() {
    
    const dialogRef = this.dialog.open(DialogChangeChooseUnitComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const link = ['../change', result.clas, result.unit ];
        this.router.navigate(link);
      }
    });

  }

  queryButtonPressed() {
    
    const dialogRef = this.dialog.open(DialogQueryChooseUnitComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        const link = ['../query', result.clas, result.unit ];
        this.router.navigate(link);
      }
    });

  }

}
