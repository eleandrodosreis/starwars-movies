import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {
  private apiRoot = 'https://swapi.co/api/';

  constructor(
    private http: HttpClient
  ) { }

  getFilms() {
    return this.http.get(this.apiRoot+'films');
  }

}
