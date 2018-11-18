import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {RestApiService} from './rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngVoc';
  joke;

  newUpdate: boolean = false;
  constructor(update: SwUpdate, private restApi: RestApiService) {
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
