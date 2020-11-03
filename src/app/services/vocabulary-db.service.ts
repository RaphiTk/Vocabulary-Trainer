import { Injectable } from '@angular/core';
import { IVocabulary, Vocabulary } from '../interfaces/vocabulary';
import { InitDbService } from './init-db.service';
import { VocabularyRestService } from './vocabulary-rest.service';
import { ActionMethod } from '../interfaces/action';
import { DbFunctionService } from '../services/db-function.service';
import { LocalStorageNamespace } from './local-storage.namespace';


@Injectable({
  providedIn: 'root'
})
export class VocabularyDbService {

  constructor(private vocRestService: VocabularyRestService, private dbFunctions: DbFunctionService) {
    
  }

  addVocabulary(voc: IVocabulary) {
    let resolveIt;
    let rejectIt;
    let promise = new Promise(function(resolve, reject) {  
      resolveIt = resolve;
      rejectIt = reject;
    });
    
    voc.id = LocalStorageNamespace.getNextPrimaryId();
    this.dbFunctions.insertVocabularyJustDb(voc).then(result => {
      this.vocRestService.postAction(ActionMethod.ADD, null, result[0]);
      resolveIt(result);
    }).catch(err => {
      rejectIt(err);
    })

    return promise;
  }

  //By Bulk Insert First all Insert and then push the actions with one request to the server
  private bulkInserVocabulary(voc: IVocabulary) {
    let resolveIt;
    let rejectIt;
    let promise = new Promise(function(resolve, reject) {  
      resolveIt = resolve;
      rejectIt = reject;
    });
    
    voc.id = LocalStorageNamespace.getNextPrimaryId();
    this.dbFunctions.insertVocabularyJustDb(voc).then(result => {
      this.vocRestService.saveActionForLaterPush(ActionMethod.ADD, null, result[0]);
      resolveIt(result);
    }).catch(err => {
      rejectIt(err);
    })

    return promise;
  }

  addBulkVocabulary(vocs: Vocabulary[], index?) {
    let resolveIt;
    let promise = new Promise(function(resolve, reject) {  
      resolveIt = resolve;
    });
    if (!index) {
      index = 0;
      //TODO: Initial Sync for performance improvements
    }
    
    this.bulkInserVocabulary(vocs[index]).then(result => {
      if (index + 1 == vocs.length) {
        this.vocRestService.sync();
        resolveIt();
      } else {
        this.addBulkVocabulary(vocs, index + 1).then(result => resolveIt());
      }
    })
    return promise;
  }

  editVocabulary(voc: Vocabulary) {
    let resolveIt, rejectIt;
    let promise = new Promise(function(resolve, reject) {  
      resolveIt = resolve;
      rejectIt = reject;
    });
    
    this.getVocabularybyId(voc.id).then(oldresult => {
      console.log("oldResult", oldresult[0])
      this.dbFunctions.updateVocabularyJustDb(voc).then(result => {
        this.vocRestService.postAction(ActionMethod.UPDATE, oldresult[0] as IVocabulary, voc);
        resolveIt(result);
      }).catch(err => {
        rejectIt(err);
      })
    })

    return promise;
  }

  deleteVocabulary(voc: Vocabulary) {
    let resolveIt, rejectIt;
    let promise = new Promise(function(resolve, reject) {  
      resolveIt = resolve;
      rejectIt = reject;
    });
    
    this.dbFunctions.deleteVocabularyJustDb(voc).then(result => {
        this.vocRestService.postAction(ActionMethod.DELETE, voc, null);
        resolveIt(result);
      }).catch(err => {
        rejectIt(err);
    })

    return promise;
  }

  getClases() {
    return this.dbFunctions.getClases();
  }

  getUnits(clas: String) {
    return this.dbFunctions.getUnits(clas);
  }

  getVocabularybyId(id: Number) {
    return this.dbFunctions.getVocabularybyId(id);
  }

  getAllVocs(): Promise<any> {
    return this.dbFunctions.getAllVocs();
  }

  getVocsFromOneUnit(clas: string, unit:string): Promise<any> {
    return this.dbFunctions.getVocsFromOneUnit(clas, unit);
  }

  getVocsFromOneClas(clas: string): Promise<any> {
    return this.dbFunctions.getVocsFromOneClas(clas);
  }

}

/*
export function InitVocabularyService(): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      let vocService = new VocabularyService();
      vocService.initDatabase().then(() => resolve());      
    });
  };
}*/