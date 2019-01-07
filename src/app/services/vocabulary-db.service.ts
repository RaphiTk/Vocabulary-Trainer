import { Injectable } from '@angular/core';
import { IVocabulary, Vocabulary } from '../interfaces/vocabulary';
import { InitDbService } from './init-db.service';
import { query } from '@angular/core/src/render3';
import { VocabularyRestService } from './vocabulary-rest.service';
import { ActionMethod } from '../interfaces/action';

@Injectable({
  providedIn: 'root'
})
export class VocabularyDbService extends InitDbService {
  static db;

  constructor(private vocRestService: VocabularyRestService) {
    super(); 
  }

  addVocabulary(voc: IVocabulary) {
    let resolveIt;
    let rejectIt;
    let promise = new Promise(function(resolve, reject) {  
      resolveIt = resolve;

    });
    
    this.insertVocabulary(voc).then(result => {
      this.vocRestService.postAction(ActionMethod.ADD, null, result[0]);
      resolveIt(result);
    }).catch(err => {
      rejectIt(err);
    })

    return promise;
  }

  private insertVocabulary(voc: IVocabulary) {
    return this.connection.insert<IVocabulary>({
      into: this.tableName,
      return: true,
      values: [voc]
    });
  }

  //By Bulk Insert First all Insert and then push the actions with one request to the server
  private bulkInserVocabulary(voc: IVocabulary) {
    let resolveIt;
    let rejectIt;
    let promise = new Promise(function(resolve, reject) {  
      resolveIt = resolve;

    });
    
    this.insertVocabulary(voc).then(result => {
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
      index = 0
    }
    
    this.bulkInserVocabulary(vocs[index]).then(result => {
      if (index + 1 == vocs.length) {
        resolveIt();
      } else {
        this.addBulkVocabulary(vocs, index + 1).then(result => resolveIt());
      }
    })
    return promise;
  }

  editVocabulary(voc: Vocabulary) {
    let resolveIt;
    let rejectIt;
    let promise = new Promise(function(resolve, reject) {  
      resolveIt = resolve;
    });
    
    this.getVocabularybyId(voc.id).then(oldresult => {
      console.log("oldResult", oldresult[0])
      this.connection.update({in: this.tableName, set: voc, where: {id: voc.id}}).then(result => {
        this.vocRestService.postAction(ActionMethod.UPDATE, oldresult[0] as IVocabulary, voc);
        resolveIt(result);
      }).catch(err => {
        rejectIt(err);
      })
    })

    return promise;
  }

  deleteVocabulary(voc: Vocabulary) {

    let resolveIt;
    let rejectIt;
    let promise = new Promise(function(resolve, reject) {  
      resolveIt = resolve;
    });
    
    this.connection.remove({ from: this.tableName, where: {id: voc.id}}).then(result => {
        this.vocRestService.postAction(ActionMethod.DELETE, voc, null);
        resolveIt(result);
      }).catch(err => {
        rejectIt(err);
    })

    return promise;
  }

  getClases() {
    return this.connection.select({ from: this.tableName, groupBy: this.colClas, order: {by: this.colClas, type: "asc", idbSorting: false}});
  }

  getUnits(clas: String) {
    return this.connection.select({from: this.tableName, where: {clas: clas}, groupBy: this.colUnit, order: {by: this.colUnit, type: "asc", idbSorting: false}})
  }

  getVocabularybyId(id: Number) {
    return this.connection.select({from: this.tableName, where: {id: id}})
  }

  getAllVocs(): Promise<any> {
    return this.connection.select({ from: this.tableName});
  }

  getVocsFromOneUnit(clas: string, unit:string): Promise<any> {
    return this.connection.select({from: this.tableName, where: {clas: clas, unit: unit}, order: {by: this.colId, type: "ASC", idbSorting: false}})
  }

  getVocsFromOneClas(clas: string): Promise<any> {
    return this.connection.select({from: this.tableName, where: {clas: clas}, order: {by: this.colId, type: "ASC", idbSorting: false}})
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