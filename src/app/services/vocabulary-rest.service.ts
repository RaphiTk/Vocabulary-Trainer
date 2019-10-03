import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Vocabulary, IVocabulary } from '../interfaces/vocabulary';
import { LocalStorageNamespace } from './local-storage.namespace';
import { environment } from 'src/environments/environment.prod';
import { LocalActionsService } from './local-actions.service';
import { IAction, Action, ActionMethod } from '../interfaces/action';
import { DbFunctionService } from './db-function.service';
import { resolveReflectiveProviders } from '@angular/core/src/di/reflective_provider';


@Injectable({
  providedIn: 'root'
})
export class VocabularyRestService {

  constructor(private httpClient: HttpClient, private auth: AuthService, private localActions: LocalActionsService, private dbFunctions: DbFunctionService) { }

  gimmeJokes() {
    return this.httpClient.get("https://api.chucknorris.io/jokes/random");
  }

  handleServiceStart() {
    let resolveIt, rejectIt;
    let promise = new Promise(function(resolve, reject) {  
      resolveIt = resolve; rejectIt = reject;
    });

    this.getNewActions().subscribe((result: any) => {
      console.log("result", result);
      if (result.length > 0) {
        this.syncLocal(result as IAction[], resolveIt, rejectIt);
      } else if (LocalStorageNamespace.getLocalSavedActions().length > 0) {
        this.postLocalActions(LocalStorageNamespace.getLocalSavedActions()).then(res => resolveIt(res)).catch(err => rejectIt(err));
      } else {
        resolveIt();
      }
    }, err => {
      console.log(err);
      rejectIt(err);
    });
    return promise;
  }

  public sync () {
    return this.handleServiceStart();
  }

  private syncLocal(serverActions: IAction[], resolveIt, rejectIt) {
    let local: IAction[] = LocalStorageNamespace.getLocalSavedActions();
    this.performReverseLocalActions(local,serverActions, resolveIt, rejectIt, local.length-1);
  }

  private performReverseLocalActions(local, serverActions, resolveIt, rejectIt, index) {
    console.log(index);
    if (local.length > 0) {
      const element = local[index];
      let _this = this;
      this.performReverseAction(element, element.method).finally(function() {
        if(element === local[local.length-1]) {
          _this.performServerActions(local, serverActions, resolveIt, rejectIt, 0);
        } else {
          _this.performReverseLocalActions(local, serverActions, resolveIt, rejectIt, index-1);
        }
      })
    } else {
      this.performServerActions(local, serverActions, resolveIt, rejectIt, 0);
    }
  }

  private performServerActions(local, serverActions, resolveIt, rejectIt, index) {
    const element = Action.deserializeVocabularies(serverActions[index]);
    let _this = this;
    this.performAction(element, element.method).finally(function() {
      if(index === serverActions.length-1) {
        LocalStorageNamespace.addCountSynchronizedActions(index + 1);
        LocalStorageNamespace.setNextPrimaryId(Action.findVocabularyId(element)+1);
        _this.performLocalActionsAndPushThem(local, serverActions, resolveIt, rejectIt, 0, []);
      } else {
        _this.performServerActions(local, serverActions, resolveIt, rejectIt, index+1);
      }
    });
  }

  private performLocalActionsAndPushThem(local, serverActions, resolveIt, rejectIt, index, localActionsReadyToPush) {
    console.log(index);
    if (local.length > 0) {
      const element = local[index];
      let oldId
      if (element.method == ActionMethod.ADD) {
        oldId = element.vocabularyAfterAction.id;
        element.vocabularyAfterAction.id = LocalStorageNamespace.getNextPrimaryId();
      }
      this.performAction(element, element.method).then((result: any) => {
        if (element.method == ActionMethod.ADD && oldId != result[0].id) {
          for (let innerIndex = index; innerIndex < local.length; innerIndex++) {
            //TODO: Just change the id when the old id == element.vocabulary.id 
            const element: IAction = local[innerIndex];
            if (element.vocabularyAfterAction != null)
              element.vocabularyAfterAction.id = result[0].id
            if (element.vocabularyBeforeAction != null)
              element.vocabularyBeforeAction.id = result[0].id
          }
        }
        localActionsReadyToPush.push(element);
        if (element === local[local.length - 1]) {
          this.postLocalActions(localActionsReadyToPush).then(res => resolveIt(res)).catch(err => rejectIt(err));
        } else {
          this.performLocalActionsAndPushThem(local, serverActions, resolveIt, rejectIt, index+1, localActionsReadyToPush);
        }
      }).catch(err => {
        console.log("sdfsdfsdfxc", err);
      });
    } else {
      resolveIt();
    }
  }
/*
  private performSerializedAction(element:any, method: ActionMethod) {
    //console.log(element);
    //console.log(JSON.parse(element.vocabularyAfterAction));
    //console.log(element);
    switch (method) {
      case ActionMethod.ADD:
        return this.dbFunctions.insertVocabularyJustDb(JSON.parse(element.vocabularyAfterAction));
        break;
      case ActionMethod.UPDATE:
        return this.dbFunctions.updateVocabularyJustDb(JSON.parse(element.vocabularyAfterAction));
        break;
      case ActionMethod.DELETE:
        return this.dbFunctions.deleteVocabularyJustDb(JSON.parse(element.vocabularyBeforeAction));
        break;
    }
  }
*/
  private performAction(element:IAction, method: ActionMethod) {
    switch (method) {
      case ActionMethod.ADD:
        return this.dbFunctions.insertVocabularyJustDb(element.vocabularyAfterAction);
        break;
      case ActionMethod.UPDATE:
        return this.dbFunctions.updateVocabularyJustDb(element.vocabularyAfterAction);
        break;
      case ActionMethod.DELETE:
        return this.dbFunctions.deleteVocabularyJustDb(element.vocabularyBeforeAction);
        break;
    }
  }

  private performReverseAction(element:IAction, method: ActionMethod) {
    switch (method) {
      case ActionMethod.ADD:
        return this.dbFunctions.deleteVocabularyJustDb(element.vocabularyAfterAction);
        break;
      case ActionMethod.UPDATE:
        return this.dbFunctions.updateVocabularyJustDb(element.vocabularyBeforeAction);
        break;
      case ActionMethod.DELETE:
        return this.dbFunctions.insertVocabularyJustDb(element.vocabularyBeforeAction);
        break;
    }
  }

  private getNewActions() {
    return this.httpClient.get(environment.vocabulary_server.URL + "?count-synchronised-actions=" + LocalStorageNamespace.getCountSynchronisedActions(), this.customHttpHeader());
  }

  private postLocalActions(actions: IAction[]) {
    let resolveIt, rejectIt;
    let promise = new Promise(function(resolve, reject) {  
      resolveIt = resolve; rejectIt = reject;
    });
    console.log(JSON.stringify(actions));
    this.httpClient.post(environment.vocabulary_server.URL + "?count-synchronised-actions=" + LocalStorageNamespace.getCountSynchronisedActions(), JSON.stringify(actions), this.customHttpHeader()).subscribe((result:any) => {
      console.log(result);
      
      if(result.status === "ok") {
        LocalStorageNamespace.addCountSynchronizedActions(actions.length);
        LocalStorageNamespace.deleteLocalSavedActions();
      } else {
        LocalStorageNamespace.setLocalSavedActions(actions);
      }
      resolveIt(result);
    }, err => {
      console.log(err);
      LocalStorageNamespace.setLocalSavedActions(actions);
      rejectIt(err);
    })

    return promise;
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
    this.saveActionForLaterPush(method, vocBeforeAction, vocAfterAction);
    if (this.auth.isAuthenticated()) {
      console.log("authenticated");
      //let actions: IAction[] = LocalStorageNamespace.getLocalSavedActions();
      //actions.push(new Action(this.getIdForNewAction(actions), method, vocBeforeAction, vocAfterAction));
      //console.log(actions, LocalStorageNamespace.getCountSynchronisedActions());
      this.sync();
      //Try Http Request 
        //if works -> perfect
        //if not -> save local
    } else {
      console.log("Not authenticated");
      //this.saveActionForLaterPush(method, vocBeforeAction, vocAfterAction);
    }
  }

  private getIdForNewAction(actions: IAction[]) {
    let newId;
    if (actions.length > 0)
      newId = actions[actions.length-1].id+1;
    else
      newId = LocalStorageNamespace.getCountSynchronisedActions();  
    return newId;
  }

  //TODO: moving function to LocalStorageNamespace
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
