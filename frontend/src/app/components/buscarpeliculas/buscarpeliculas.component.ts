import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// Servicio
import { ApiThemoviedbService } from '../../services/api-themoviedb.service';
//Routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscarpeliculas',
  templateUrl: './buscarpeliculas.component.html',
  styleUrls: ['./buscarpeliculas.component.css']
})
export class BuscarpeliculasComponent implements OnInit {

  private films: any = [];
  private filmDetails;
  private allFilms = []
  private filmsFiltered : any = []
  private imgurlbase = "https://image.tmdb.org/t/p/w185";
  @Output() lookDetails = new EventEmitter<any>();

  constructor(
    private service: ApiThemoviedbService,
    private router: Router
  ) { 
    this.service.getAllFilms().subscribe((data: any) => { this.films = data.data.movies
    this.allFilms = data.data.movies}
    )
  }

  ngOnInit() {
  }

  searchFilm(nameToSearch: string): void{
    if (nameToSearch === "") {
      this.films = this.allFilms
    } else {
      this.filmsFiltered = this.allFilms.filter(function (film) {
        film.name.include
        return film.name.toLowerCase().indexOf(nameToSearch.toLowerCase()) !== -1
        })
        this.films = this.filmsFiltered
    }
  }

  search(id: number){
    this.router.navigate(['movie-details', id]);
  }
}
