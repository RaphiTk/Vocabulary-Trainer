import { Vocabulary } from "./vocabulary";

export class FilteredDataObject {
    clas: string;
    unit: string;
    data: Vocabulary[];

    constructor() {
        this.data = [];
    }
}
  