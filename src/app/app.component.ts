import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {RestApiService} from './services/rest-api.service';
import { Router, RoutesRecognized, NavigationEnd } from '@angular/router';

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
  constructor(update: SwUpdate, private restApi: RestApiService, private router: Router) {
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
      this.newUpdate = true;
      update.activateUpdate().then(() => document.location.reload());
    })
  }

  ngOnInit() {
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
