import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private httpClient: HttpClient) { }

  gimmeJokes() {
    return this.httpClient.get("https://api.chucknorris.io/jokes/random");
  }
}
