import { Injectable } from '@angular/core';
import { Vocabulary } from '../interfaces/vocabulary';
import { LocalStorageNamespace } from './local-storage.namespace';
import { IAction, Action, ActionMethod } from '../interfaces/action';

@Injectable({
  providedIn: 'root'
})
export class LocalActionsService {

  constructor() { }

  /*addAction(voc: Vocabulary, method: ActionMethod){
    let actions: IAction[] = LocalStorageNamespace.getLocalSavedActions();
    let newId;
    if (actions.length > 0)
      newId = actions[actions.length-1];
    else
      newId = LocalStorageNamespace.getCountSynchronisedActions();  
    let newAction = new Action(newId, method, voc);
    actions.push(newAction);
  }*/
}
