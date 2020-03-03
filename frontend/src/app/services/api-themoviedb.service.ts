import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiThemoviedbService {
  private dominioURL = "http://localhost:3000/api/movie";
  private searchURL: string;

  constructor(private http: HttpClient) {}

  getAllFilms() {
    return this.http.get(this.dominioURL);
  }

  // Buscar películas por nombre
  searchFilms(film: string) {
    this.searchURL = this.dominioURL + film;
    let result = this.http.get(this.searchURL);
    console.log(result);
    return result;
  }

  // Buscar detalles de una película
  getMovieDetails(id: string) {
    this.searchURL =
      this.dominioURL + "/unique/" + id + "?";
    return this.http.get(this.searchURL);
  }

  // Buscar películas en cartelera
  searchNowPlayingMovies() {
    this.searchURL = this.dominioURL + "/movie/now-playing";
    return this.http.get(this.searchURL);
  }

  // Buscar películas populares
  searchPopularMovies() {
    this.searchURL = this.dominioURL + "/movie/popular";
    return this.http.get(this.searchURL);
  }

  // Create movie
  createMovie(movie) {
    return this.http.post<any>(this.dominioURL, movie);
  }

  // Load movie poster
  loadMovieImg(formData: FormData) {
    this.searchURL = this.dominioURL + "/load-movie";
    return this.http.post(this.searchURL, formData, {
      reportProgress: true,
      observe: "events"
    });
  }

  //Votar una película
  rateMovie(id: number, vote: number) {
    let body_rate: any = {};
    body_rate.vote = vote
    let url = this.searchURL = this.dominioURL + "/movie/vote/" + id
    return this.http.post(url, body_rate)
  }
}
