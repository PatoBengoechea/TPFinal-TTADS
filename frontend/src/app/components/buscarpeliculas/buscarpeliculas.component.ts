import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

// Servicio
import { ApiThemoviedbService } from "../../services/api-themoviedb.service";

//Routing
import { Router } from "@angular/router";

@Component({
  selector: "app-buscarpeliculas",
  templateUrl: "./buscarpeliculas.component.html",
  styleUrls: ["./buscarpeliculas.component.css"]
})
export class BuscarpeliculasComponent implements OnInit {
  private films: any = [];
  private filmDetails;
  private allFilms = [];
  private filmsFiltered: any = [];
  // private imgurlbase = "https://image.tmdb.org/t/p/w185";
  private errorMessage: string;
  @Output() lookDetails = new EventEmitter<any>();

  constructor(
    private service: ApiThemoviedbService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.service.getAllFilms().subscribe(
      (data: any) => {
        this.films = data.data.movies;
        this.allFilms = data.data.movies;
        this.spinner.hide();
      },
      err => {
        console.log(err);
        if (err.status === 0) {
          this.errorMessage = "Unable to connect with server";
        }
        this.spinner.hide();
      }
    );
  }

  ngOnInit() {}

  searchFilm(nameToSearch: string): void {
    if (nameToSearch === "") {
      this.films = this.allFilms;
    } else {
      this.filmsFiltered = this.films.filter(function(film) {
        film.name.include;
        return (
          film.name.toLowerCase().indexOf(nameToSearch.toLowerCase()) !== -1
        );
      });
      this.films = this.filmsFiltered;
    }
  }

  search(id: number) {
    this.router.navigate(["movie-details", id]);
  }
}
