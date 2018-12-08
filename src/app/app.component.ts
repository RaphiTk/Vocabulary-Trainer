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
  title = 'ngVoc';
  isMainMenu
  joke;

  newUpdate: boolean = false;
  constructor(update: SwUpdate, private restApi: RestApiService, private router: Router) {
    document.ontouchstart = function(e){ 
      e.preventDefault(); 
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
    this.restApi.gimmeJokes().subscribe(res => {
      this.joke = res;
    })
  }
}
