import { Component, OnInit } from '@angular/core';
import { VocabularyService } from '../../services/vocabulary.service';
import { Vocabulary } from '../../interfaces/vocabulary';

@Component({
  selector: 'app-site-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SiteSearchComponent implements OnInit {
  vocs: Vocabulary[];
  filteredVocs: Vocabulary[];

  constructor(public vocService: VocabularyService) { }

  ngOnInit() {
    this.vocService.getAllVocs().then((result) => {
      console.log(JSON.stringify(result));
      this.vocs = result; this.filteredVocs = result
    });
  
    let editable = document.getElementById("SearchText");

    if (editable.addEventListener) {
      editable.addEventListener("input", evt => this.filterItems(evt), false);
    }
  }

  filterItems(evt): void {
    let searchText = document.getElementById("SearchText").innerHTML;
    
    //Firefox Bug Fix
    if (searchText.includes("<br>")) {
      searchText = searchText.replace("<br>", "");
    }

    if (searchText === "") {
      this.filteredVocs = this.vocs;
      return;
    }

    let newFilteredVocs: Vocabulary[] = new Array();
    searchText = searchText.toUpperCase();
    for (let voc of this.vocs) {
      if (voc.primaryLanguage.toUpperCase().includes(searchText) || voc.secondaryLanguage.toUpperCase().includes(searchText)) {
        newFilteredVocs.push(voc);
      }
    }
    this.filteredVocs = newFilteredVocs;

  }

}
