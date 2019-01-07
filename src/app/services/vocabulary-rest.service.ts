import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Vocabulary, IVocabulary } from '../interfaces/vocabulary';
import { LocalStorageNamespace } from './local-storage.namespace';
import { environment } from 'src/environments/environment.prod';
import { LocalActionsService } from './local-actions.service';
import { IAction, Action, ActionMethod } from '../interfaces/action';


@Injectable({
  providedIn: 'root'
})
export class VocabularyRestService {

  constructor(private httpClient: HttpClient, private auth: AuthService, private localActions: LocalActionsService) { }

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

  private customHttpHeader() {
    let headers = {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.accessToken)};
    console.log(headers);
    return headers;
  }

  //Erst einmal nur lokal ; TODO: HTTP request einbauen
  /*
  if (this.auth.isAuthenticated()) {
      //Try Http Request 
        //if works -> perfect
        //if not -> save local
    } else {
      this.localActions.addAction(voc, ActionMethod.DELETE)
    }
    */
  postAction(method: ActionMethod, vocBeforeAction: IVocabulary, vocAfterAction: IVocabulary) {
    if (this.auth.isAuthenticated()) {
      let actions: IAction[] = LocalStorageNamespace.getLocalSavedActions();
      actions.push(new Action(this.getIdForNewAction(actions), method, vocBeforeAction, vocAfterAction));
      console.log(actions, LocalStorageNamespace.getCountSynchronisedActions());
      this.httpClient.post(environment.vocabulary_server.URL + "?count-synchronised-actions=" + LocalStorageNamespace.getCountSynchronisedActions(), JSON.stringify(actions), this.customHttpHeader()).subscribe((result:any) => {
        console.log(result);
        console.log(result.hasOwnProperty("status"));
        
        if(result.status === "ok") {
          LocalStorageNamespace.setLocalSavedActions(LocalStorageNamespace.defaultSavedActions);
        } else {
          LocalStorageNamespace.setLocalSavedActions(actions);
        }
      })
      //Try Http Request 
        //if works -> perfect
        //if not -> save local
    } else {
      this.saveActionForLaterPush(method, vocBeforeAction, vocAfterAction);
    }
  }

  private getIdForNewAction(actions: IAction[]) {
    let newId;
    if (actions.length > 0)
      newId = actions[actions.length-1];
    else
      newId = LocalStorageNamespace.getCountSynchronisedActions();  
    return newId;
  }

  saveActionForLaterPush(method: ActionMethod, vocBeforeAction: IVocabulary, vocAfterAction: IVocabulary) {
    let actions: IAction[] = LocalStorageNamespace.getLocalSavedActions();
    actions.push(new Action(this.getIdForNewAction(actions), method, vocBeforeAction, vocAfterAction));
    LocalStorageNamespace.setLocalSavedActions(actions);
  }

  /*
  postDeleteAction(voc: Vocabulary) {
    if (this.auth.isAuthenticated()) {
      //Try Http Request 
        //if works -> perfect
        //if not -> save local
    } else {
      //this.localActions.addAction(voc, ActionMethod.DELETE)
    }
  }

  postAddAction(voc: Vocabulary) {
    if (this.auth.isAuthenticated()) {
      //Try Http Request 
        //if works -> perfect
        //if not -> save local
    } else {
      //this.localActions.addAction(voc, ActionMethod.ADD)
    }
  }

  postUpdateAction(voc: Vocabulary) {
    if (this.auth.isAuthenticated()) {
      //Try Http Request 
        //if works -> perfect
        //if not -> save local
    } else {
     // this.
    }
  }

  getPublic() {
    this.httpClient.get("http://localhost:3010/api/public").subscribe(result => {
      console.log(result);
    }, err => {
      console.log(err);
    })
  }*/
}
