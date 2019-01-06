import { Injectable } from '@angular/core';
import { IVocabulary, Vocabulary } from '../interfaces/vocabulary';
import { InitDbService } from './init-db.service';
import { query } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class VocabularyDbService extends InitDbService {
  static db;

  constructor() {
    super(); 
  }

  addVocabulary(voc: IVocabulary) {
    return this.connection.insert<IVocabulary>({
      into: this.tableName,
      return: true,
      values: [voc]
    });
  }

  addBulkVocabulary(vocs: Vocabulary[], index?) {
    let resolveIt;
    let promise = new Promise(function(resolve, reject) {  
      resolveIt = resolve;
    });
    if (!index) {
      index = 0
    }
    //vocs[index].id = null;
    this.addVocabulary(vocs[index]).then(result => {
      if (index + 1 == vocs.length) {
        resolveIt();
      } else {
        this.addBulkVocabulary(vocs, index + 1).then(result => resolveIt());
      }
    })
    return promise;
  }

  editVocabulary(voc: Vocabulary) {
    return this.connection.update({in: this.tableName, set: voc, where: {id: voc.id}})
  }

  deleteVocabulary(voc: Vocabulary) {
    return this.connection.remove({ from: this.tableName, where: {id: voc.id}})
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