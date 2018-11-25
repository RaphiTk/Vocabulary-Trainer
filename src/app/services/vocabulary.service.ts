import { Injectable } from '@angular/core';
import { Vocabulary } from '../interfaces/vocabulary';
import { BaseService } from './base.service';
import {   DATA_TYPE,  ITable } from 'jsstore';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService extends BaseService {
  static db;

  constructor() {
    super(); 
  }

  addVocabulary(voc: Vocabulary) {
    return this.connection.insert<Vocabulary>({
      into: this.tableName,
      return: true,
      values: [voc]
    });
  }

  getClases() {
    return this.connection.select({ from: this.tableName, groupBy: this.colClas, order: {by: this.colClas, type: "asc"}});
  }

  getUnits(clas: String) {
    return this.connection.select({from: this.tableName, where: {clas: clas}, groupBy: this.colUnit, order: {by: this.colUnit, type: "asc"}})
  }

  getVocabularybyId(id: Number) {
    return this.connection.select({from: this.tableName, where: {id: id}})
  }

  getAllVocs(): Promise<any> {
    return this.connection.select({ from: this.tableName, order: {by: this.colPrimaryLanguage, type: "asc" }, ignoreCase: true});
  }

  getVocsFromOneUnit(clas: string, unit:string): Promise<any> {
    return this.connection.select({from: this.tableName, where: {clas: clas, unit: unit}, order: {by: this.colId, type: "ASC"}})
  }

  getVocsFromOneClas(clas: string): Promise<any> {
    return this.connection.select({from: this.tableName, where: {clas: clas}, order: {by: this.colId, type: "ASC"}})
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