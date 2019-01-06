import { Injectable } from '@angular/core';
import {  IdbService } from './idb.service';
import {  IDataBase,  DATA_TYPE,  ITable } from 'jsstore';


@Injectable({
  providedIn: 'root'
})
export class InitDbService {

  private dbName = "Ts_Vocabulary";
  protected tableName = "Vocabulary";
  protected colId = "id";
  protected colClas = "clas";
  protected colUnit = "unit";
  protected colPrimaryLanguage = "primaryLanguage";
  protected colSecondaryLanguage = "secondaryLanguage";
  protected colTries = "tries";
  protected colFailuresCount = "failuresCount";

  constructor() {
      // initiate database when a service instance is initiated
      this.initDatabase();
  }

  /**
   * create database
   * 
   * @memberof IdbService
   */
  private initDatabase() {
      this.connection.isDbExist(this.dbName).then(isExist => {
        if (isExist) {
          this.connection.openDb(this.dbName);
        } else {
          const dataBase = this.getDatabase();
          this.connection.createDb(dataBase);
        }
      }).catch(err => {
        // this will be fired when indexedDB is not supported.
        alert(err.message);
      });
  }

  private getDatabase() {
    const tblVocabulary: ITable = {
      name: this.tableName,
      columns: [{
        name: this.colId,
        primaryKey: true,
        autoIncrement: true
      },
      {
        name: this.colClas,
        dataType: DATA_TYPE.String,
        notNull: true
      },
      {
        name: this.colUnit,
        dataType: DATA_TYPE.String,
        notNull: true
      },
      {
        name: this.colPrimaryLanguage,
        notNull: true,
        dataType: DATA_TYPE.String
      },
      {
        name: this.colSecondaryLanguage,
        dataType: DATA_TYPE.String,
        notNull: true
      },
      {
        name: this.colTries,
        dataType: DATA_TYPE.Number,
        notNull: true,
        default: '0'
      },
      {
        name: this.colFailuresCount,
        dataType: DATA_TYPE.Number,
        notNull: true,
        default: '0'
      }
      ]
    };
    const dataBase: IDataBase = {
      name: this.dbName,
      tables: [tblVocabulary]
    };
    return dataBase;
}

  get connection() {
    return IdbService.idbCon;
  }
}
