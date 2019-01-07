import { IVocabulary } from "./vocabulary";

export interface IAction {
    id: number;
    method: ActionMethod;
    vocabularyBeforeAction: IVocabulary;
    vocabularyAfterAction: IVocabulary;
    //reverseMethod?: ActionMethod; //Only used local
}

export class Action implements IAction {
    id: number;
    method: ActionMethod;
    vocabularyBeforeAction: IVocabulary;
    vocabularyAfterAction: IVocabulary;

    constructor(id: number, method: ActionMethod, vocabularyBeforeAction:IVocabulary, vocabularyAfterAction:IVocabulary) {
        this.id = id;
        this.method = method;
        this.vocabularyBeforeAction = vocabularyBeforeAction;
        this.vocabularyAfterAction = vocabularyAfterAction;
    }
}

export enum ActionMethod {
    ADD = "ADD",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}