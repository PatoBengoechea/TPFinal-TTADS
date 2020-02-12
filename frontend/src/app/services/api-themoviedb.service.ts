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
    let url = this.dominioURL;
    return this.http.get(url);
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
    this.searchURL = this.dominioURL + "/now-playing";
    return this.http.get(this.searchURL);
  }

  // Buscar películas populares
  searchPopularMovies() {
    this.searchURL = this.dominioURL + "/popular";
    return this.http.get(this.searchURL);
  }

  // Create movie
  createMovie(movie) {
    return this.http.post<any>(this.dominioURL, movie);
  }

  //Votar una película
  // Adaptarlo a nuestro tp
  rateMovie(id: number, vote: number) {
    let body_rate: any = {};

    // Rate the movie (con guest_sesion_id)
    // https://api.themoviedb.org/3/movie/{movie_id}/rating?api_key=afbc1995a41f72f35622f748d82068dc&guest_session_id=<<guest_session_id>>
    /* body_rate.value = vote;
    this.searchURL =
      this.dominioURL +
      "/movie/" +
      id +
      "/rating?" +
      this.apiKey +
      "&guest_session_id=" +
      this.guest_session.guest_session_id;
    return this.http.post(this.searchURL, body_rate); */
  }
}
