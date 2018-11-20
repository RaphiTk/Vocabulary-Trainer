import { Injectable } from '@angular/core';
import { Vocabulary, VocabularyWithOutKey } from './interfaces/vocabulary';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  static db;

  constructor() { 
  }

  initDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      let request = indexedDB.open('VocabularyTrainer', 1);

      request.onupgradeneeded = function(){
        console.log('Datenbank angelegt');
        var db = this.result;
        if(!db.objectStoreNames.contains('vocabulary')){
          let store = db.createObjectStore('vocabulary', {
            keyPath: 'key',
            autoIncrement: true
          });
        }
      };

      request.onsuccess = function(){
        console.log('Datenbank geöffnet');
        VocabularyService.db = this.result;
        resolve();
      }
    });
  }

  addElement(newElement: VocabularyWithOutKey): Promise<any> {
   /*var item: VocabularyWithOutKey = {
      tries:0,
      failuresCount: 0,
    
      clas: "123",
      unit: "456",
      primaryLanguage: "Test",
      secondaryLanguage: "NEw"
    };

    var item2: VocabularyWithOutKey = {
      tries:0,
      failuresCount: 0,
    
      clas: "1233",
      unit: "456",
      primaryLanguage: "Test",
      secondaryLanguage: "NEw"
    };*/
    //var item = { title: 'Web Storage' };
    return new Promise((resolve, reject) => {
      var trans = VocabularyService.db.transaction(['vocabulary'], 'readwrite');
      var store = trans.objectStore('vocabulary');
      var request = store.add(newElement); // `item` in dem Store ablegen
      
  
      // Erfolgs-Event
      request.onsuccess = function(evt){
        let result: Vocabulary = <Vocabulary> newElement;
        result.key = evt.target.result;
        resolve(result);
      };  
    })
    
    /*
    var request2 = store.put(item2);
    request2.onsuccess = function(evt){
      console.log('Eintrag ' + evt.target.result + ' gespeichert');
    };*/
  }

  getAllVocs(): Promise<any> {
    return new Promise((resolve, reject) => {
      let objectStore = VocabularyService.db.transaction("vocabulary").objectStore("vocabulary");
      let vars: Vocabulary[] = new Array();

      objectStore.openCursor().onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
          vars.push(cursor.value)
          cursor.continue();
        }
        else {
          resolve(vars);
        }
      };
    });
  }

  getVocsByClasAndUnit(clas: string, unit:string): Promise<any> {
    return new Promise((resolve, reject) => {
      let objectStore = VocabularyService.db.transaction("vocabulary").objectStore("vocabulary");
      let vars: Vocabulary[] = new Array();

      objectStore.openCursor().onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
          if(cursor.value.unit === unit && cursor.value.clas === clas) {
            vars.push(cursor.value)
          }
          //alert("Name for SSN " + cursor.key + " is " + cursor.value.title);
          cursor.continue();
        }
        else {
          resolve(vars);
        }
      };
    });
  }

}


export function InitVocabularyService(): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      let vocService = new VocabularyService();
      vocService.initDatabase().then(() => resolve());      
    });
  };
}