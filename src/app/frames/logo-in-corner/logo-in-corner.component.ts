import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-in-corner',
  templateUrl: './logo-in-corner.component.html',
  styleUrls: ['./logo-in-corner.component.css']
})
export class LogoInCornerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.deleteAddButton();
    setTimeout(()=>this.deleteAddButton(),200);
  }

  private deleteAddButton() {
    let images: HTMLCollectionOf<HTMLImageElement> = document.images;
    console.log(images);
    for (let index = 0; index < images.length; index++) {
      const element: HTMLImageElement = images.item(index);
      if (element.alt === "Free Web Hosting") {
        element.width = 0;
        element.height = 0;
      }
      
    }
  }

}
