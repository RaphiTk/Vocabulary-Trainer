import { VocabularyRestService } from 'src/app/services/vocabulary-rest.service';
import { FilteredDataObject } from './../interfaces/FilteredDataObject';
import { VocabularyDbService } from './vocabulary-db.service';
import { Vocabulary } from './../interfaces/vocabulary';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {


  private currentUsedFilteredDataObject: FilteredDataObject[] = [];

  constructor(private vocService: VocabularyDbService, private restService: VocabularyRestService) { }

  sync() {
    return this.restService.sync();
  }

  addBulkVocabulary(vocs: Vocabulary[]) {
    return this.vocService.addBulkVocabulary(vocs);
  }

  /**
   * Get all Vocabularies for a clas, this array wont be updated automatically as in getAllVocs
   * @param clas Clas to get Vocabularies for
   */
  getVocsFromOneClas(clas: string): Promise<Vocabulary[]> {
    return this.vocService.getVocsFromOneClas(clas);
  }

  /**
   * Get all Vocabularies for a unit, this array wont be updated automatically as in getAllVocs
   * @param clas Clas to get Vocabularies for
   * @param unit unit to get Vocabularies for
   */
  getVocsFromOneUnit(clas: string, unit: string): Promise<Vocabulary[]> {
    return this.vocService.getVocsFromOneUnit(clas, unit);
  }

  async getVocsFromOneUnitWithUpdate(clas: string, unit: string): Promise<FilteredDataObject> {
    let result = await this.vocService.getVocsFromOneUnit(clas, unit);
    let filteredDataObject = new FilteredDataObject();
    filteredDataObject.clas = clas;
    filteredDataObject.unit = unit;
    filteredDataObject.data = Vocabulary.createCorrectReferences(result); 

    this.currentUsedFilteredDataObject.push(filteredDataObject);
    return filteredDataObject;
  }

  async getAllVocs(): Promise<FilteredDataObject> {
    let result = await this.vocService.getAllVocs();
    let filteredDataObject = new FilteredDataObject();
    filteredDataObject.data = Vocabulary.createCorrectReferences(result); 
    this.currentUsedFilteredDataObject.push(filteredDataObject);
    return filteredDataObject;
  }

  async addVocabulary(voc: Vocabulary): Promise<any> {
    let result = await this.vocService.addVocabulary(voc);
    this.addVocToAllFilteredDataObjects(voc);
    return result;
  }

  async deleteVocabulary(voc: Vocabulary) {
    this.deleteVocFromFilteredDataObjects(voc);
    return this.vocService.deleteVocabulary(voc);
  }

  async editVocabulary(voc: Vocabulary) {
    let result = await this.vocService.editVocabulary(voc);
    this.editVocInAllFilteredDataObjects(voc);
    return result;
  }

  public removeFilteredDataObject(obj: FilteredDataObject) {
    if (this.currentUsedFilteredDataObject.includes(obj)) {
      this.currentUsedFilteredDataObject.splice(this.currentUsedFilteredDataObject.indexOf(obj), 1)
    }
  }

  private addVocToAllFilteredDataObjects(voc: Vocabulary) {
    this.currentUsedFilteredDataObject.forEach((object) => {
      if(this.vocFitsFilterOfDataObject(object, voc)) {
        object.data.push(voc);
      }
    })
  }

  private deleteVocFromFilteredDataObjects(voc: Vocabulary) {
    this.currentUsedFilteredDataObject.forEach((object) => {
      if(this.vocFitsFilterOfDataObject(object, voc)) {
        let index = object.data.indexOf(voc);
        if (index > -1) {
          object.data.splice(index, 1)
        }
      }
    })
  }

  private editVocInAllFilteredDataObjects(voc: Vocabulary) {
    this.currentUsedFilteredDataObject.forEach((object) => {
      if(this.vocFitsFilterOfDataObject(object, voc)) {
        object.data.forEach((oldVocData) => {
          if (oldVocData.id == voc.id) {
            oldVocData = voc;
          }
        })
      }
    })
  }

  private vocFitsFilterOfDataObject(filteredDataObject: FilteredDataObject, voc: Vocabulary) {
    if (filteredDataObject.clas == null && filteredDataObject.unit == null) {
      return true;
    } else if (filteredDataObject.clas == null && filteredDataObject.unit != null) {
      return (filteredDataObject.unit == voc.unit);
    } else {
      return (filteredDataObject.clas == voc.clas && filteredDataObject.unit == voc.unit);
    }
  }
}
