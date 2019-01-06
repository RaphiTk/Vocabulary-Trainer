import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {VocabularyRestService} from './services/vocabulary-rest.service';
import { Router, RoutesRecognized, NavigationEnd } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMainMenu;
  isMobileUser;
  //joke;

  newUpdate: boolean = false;
  constructor(update: SwUpdate, private restApi: VocabularyRestService, private router: Router, public snackBar: MatSnackBar, private auth: AuthService) {
    auth.handleAuthentication();
    
    document.ontouchstart = function(e){ 
      e.preventDefault(); 
    }

    if(screen.height > 600 && screen.width > 600) {
      this.isMobileUser = false;
    } else {
      this.isMobileUser = true;
      this.changeCssClasses();
    }
    
    this.router.events
    .subscribe((event) => {
      // example: NavigationStart, RoutesRecognized, NavigationEnd
      if (event instanceof RoutesRecognized) {
        if (event.url == "/") {
          this.isMainMenu = true;
        } else {
          this.isMainMenu = false;
        }
      }
      
    });

    update.available.subscribe(event => {
      const snack = this.snackBar.open('Update Available', 'Reload', {duration: 5000});

      snack
        .onAction()
        .subscribe(() => {
          window.location.reload();
        });

    })
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.auth.renewSession();
    }

    //this.deleteAddvertismentButton();
    //setTimeout(()=>this.deleteAddvertismentButton(),200);
    /*this.restApi.gimmeJokes().subscribe(res => {
      this.joke = res;
    })*/
  }

  /*
  private deleteAddvertismentButton() {
    let images: HTMLCollectionOf<HTMLImageElement> = document.images;
    console.log(images);
    for (let index = 0; index < images.length; index++) {
      const element: HTMLImageElement = images.item(index);
      if (element.alt === "Free Web Hosting") {
        element.width = 0;
        element.height = 0;
      }
      
    }

  }
    */

  private changeCssClasses() {
  }
}
