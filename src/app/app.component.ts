import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Biblioteca';
  films: any = Array();
  renderFilmScreen: boolean = false;
  filmDetails: any = Array();

  constructor(
    private service : AppService, 
    private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getFilms();
  }

  getFilms() {
    this.service.getFilms().subscribe(
      data => {
        this.films = data;
        this.orderFilms();
      });
  }

  orderFilms() {
    let temp = Array();
    for (let i = 0; i < this.films.results.length; i++) {
        temp[this.films.results[i].episode_id] = this.films.results[i];
        temp[this.films.results[i].episode_id].image = this._sanitizer.bypassSecurityTrustStyle(`url(../assets/images/star-wars-${this.films.results[i].episode_id}.jpg)`);
    }
    this.films.results = temp.filter(function(n){ return n != undefined });
  }

  openFilm(film) {
    this.filmDetails = film;
    this.renderFilmScreen = true;
  }

  closeFilm() {
    this.renderFilmScreen = false;
  }
}
