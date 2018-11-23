import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material';
import { DialogChangeChooseUnitComponent } from '../../dialogs/dialog-change-choose-unit/dialog-change-choose-unit.component';
import { Router } from '@angular/router';

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
      console.log('The dialog was closed');
      const link = ['../change', result.clas, result.unit ];
      //const link = ['../search']
      this.router.navigate(link);
    });

  }

}
