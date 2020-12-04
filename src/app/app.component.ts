import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {VocabularyRestService} from './services/vocabulary-rest.service';
import { Router, RoutesRecognized, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMainMenu;
  isMobileUser;
  newUpdate: boolean = false;

  constructor(update: SwUpdate, private restApi: VocabularyRestService, private router: Router, public snackBar: MatSnackBar, private auth: AuthService) {    
    document.ontouchstart = function(e){ 
      e.preventDefault(); 
    }

    restApi.sync();

    console.info("App version: " + environment.version);

    if(screen.height > 600 && screen.width > 600) {
      this.isMobileUser = false;
    } else {
      this.isMobileUser = true;
    }
    
    this.router.events
    .subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        if (event.url == "/" || event.urlAfterRedirects == "/") {
          this.isMainMenu = true;
        } else {
          this.isMainMenu = false;
        }
      }
    });

    update.available.subscribe(event => {
      const snack = this.snackBar.open('Update Available', 'Reload', {duration: 5000});
      snack.onAction()
        .subscribe(() => {
          window.location.reload();
        });
    })
  }
}
