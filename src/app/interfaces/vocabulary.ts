export interface IVocabulary {
    id?;
    tries;
    failuresCount;
    
    clas;
    unit;
    primaryLanguage;
    secondaryLanguage;
}

export class Vocabulary implements IVocabulary{
    id;
    tries;
    failuresCount;
    
    clas;
    unit;
    primaryLanguage;
    secondaryLanguage; 

    constructor(newId?, newTries?, newFailuresCount?, newClas?, newUnit?, newPrimaryLanguage?, newSecondaryLanguage?) {
        this.id = newId;
        this.tries = newTries;
        this.failuresCount = newFailuresCount;
        this.clas = newClas;
        this.unit = newUnit;
        this.primaryLanguage = newPrimaryLanguage;
        this.secondaryLanguage = newSecondaryLanguage;
    }
}

/*
export interface VocabularyWithOutKey {
    tries;
    failuresCount;
    
    clas;
    unit;
    primaryLanguage;
    secondaryLanguage;
}*/
