import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Vocabulary, IVocabulary } from '../interfaces/vocabulary';
import { LocalStorageNamespace } from './local-storage.namespace';
import { environment } from 'src/environments/environment.prod';
import { LocalActionsService } from './local-actions.service';
import { IAction, Action, ActionMethod } from '../interfaces/action';
import { DbFunctionService } from './db-function.service';


@Injectable({
  providedIn: 'root'
})
export class VocabularyRestService {

  constructor(private httpClient: HttpClient, private auth: AuthService, private localActions: LocalActionsService, private dbFunctions: DbFunctionService) { }

  gimmeJokes() {
    return this.httpClient.get("https://api.chucknorris.io/jokes/random");
  }

  handleServiceStart() {
    this.getNewActions().subscribe((result: any) => {
      //if(result.status === "ok") {
        if (result.length > 0) {
          this.syncLocal(result as IAction[]);
        } else if (LocalStorageNamespace.getLocalSavedActions().length > 0) {
          this.postLocalActions(LocalStorageNamespace.getLocalSavedActions());
        }
      //} else {
        console.log("result", result);
      //}
    }, err => {
      console.log(err);
    })
  }

  private syncLocal(serverActions: IAction[]) {
    let local: IAction[] = LocalStorageNamespace.getLocalSavedActions();
    for (let index = local.length-1; index >= 0; index--) {
      const element = local[index];
      this.performAction(element, Action.findReverseMethod(element.method));
    }

    for (let index = 0; index < serverActions.length; index++) {
      const element = serverActions[index];
      this.performAction(element, element.method);
    }

    for (let index = 0; index < local.length; index++) {
      const element = local[index];
      if (element.method == ActionMethod.ADD) {
        let oldId = element.vocabularyAfterAction.id;
        element.vocabularyAfterAction.id = null
        this.performAction(element, element.method).then((result) => {
          console.log(result);
        });
      }
      
    }
    //Now we have to add the deleted Actions and Publish the Actions then to the Server
    //The challenge:
    //    - Through the server Actions, the recently deleted Actions will have another Id after the insert
    //    - Through the server Actions, a vocabulary could be deleted. A Update on the Vocabulary don't work
  }

  private performAction(element:IAction, method: ActionMethod) {
    switch (method) {
      case ActionMethod.ADD:
        return this.dbFunctions.insertVocabularyJustDb(element.vocabularyBeforeAction);
        break;
      case ActionMethod.UPDATE:
        return this.dbFunctions.updateVocabularyJustDb(element.vocabularyBeforeAction);
        break;
      case ActionMethod.DELETE:
        return this.dbFunctions.deleteVocabularyJustDb(element.vocabularyAfterAction);
        break;
    }
  }

  private getNewActions() {
    return this.httpClient.get(environment.vocabulary_server.URL + "?count-synchronised-actions=" + LocalStorageNamespace.getCountSynchronisedActions(), this.customHttpHeader());
  }

  private postLocalActions(actions: IAction[]) {
    console.log(JSON.stringify(actions));
    this.httpClient.post(environment.vocabulary_server.URL + "?count-synchronised-actions=" + LocalStorageNamespace.getCountSynchronisedActions(), JSON.stringify(actions), this.customHttpHeader()).subscribe((result:any) => {
      console.log(result);
      
      if(result.status === "ok") {
        LocalStorageNamespace.addCountSynchronizedActions(actions.length);
        LocalStorageNamespace.setLocalSavedActions(LocalStorageNamespace.defaultSavedActions);
      } else {
        LocalStorageNamespace.setLocalSavedActions(actions);
      }
    }, err => {
      console.log(err);
      LocalStorageNamespace.setLocalSavedActions(actions);
    })
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
      console.log("authenticated");
      let actions: IAction[] = LocalStorageNamespace.getLocalSavedActions();
      actions.push(new Action(this.getIdForNewAction(actions), method, vocBeforeAction, vocAfterAction));
      console.log(actions, LocalStorageNamespace.getCountSynchronisedActions());
      this.postLocalActions(actions);
      //Try Http Request 
        //if works -> perfect
        //if not -> save local
    } else {
      console.log("Not authenticated");
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
