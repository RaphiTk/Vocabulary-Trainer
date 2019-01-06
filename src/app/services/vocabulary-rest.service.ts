import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Vocabulary } from '../interfaces/vocabulary';
import { LocalStorageNamespace } from './local-storage.namespace';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class VocabularyRestService {

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  gimmeJokes() {
    return this.httpClient.get("https://api.chucknorris.io/jokes/random");
  }

  handleServiceStart() {
    this.getNewActions().subscribe(result => {
      console.log(result);
    }, err => {
      console.log(err);
    })
  }

  getNewActions() {
    return this.httpClient.get(environment.vocabulary_server.URL + "?count-synchronised-actions=" + LocalStorageNamespace.getCountSynchronisedActions(), this.customHttpHeader());
  }

  customHttpHeader() {
    return {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.accessToken)};
  }

  postDeleteAction(voc: Vocabulary) {
    if (this.auth.isAuthenticated()) {
      //Try Http Request 
        //if works -> perfect
        //if not -> save local
    } else {
      //save local
    }
  }

  postAddAction(voc: Vocabulary) {
    if (this.auth.isAuthenticated()) {
      //Try Http Request 
        //if works -> perfect
        //if not -> save local
    } else {
      //save local
    }
  }

  postUpdateAction(voc: Vocabulary) {
    if (this.auth.isAuthenticated()) {
      //Try Http Request 
        //if works -> perfect
        //if not -> save local
    } else {
      //save local
    }
  }

  getPublic() {
    this.httpClient.get("http://localhost:3010/api/public").subscribe(result => {
      console.log(result);
    }, err => {
      console.log(err);
    })
  }
}
