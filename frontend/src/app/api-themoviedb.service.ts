import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ApiThemoviedbService {

  //private dominioURL = "https://api.themoviedb.org/3";
  private dominioURL = "http://localhost:3000/api";
  private apiKey = "api_key=afbc1995a41f72f35622f748d82068dc";
  private language = "&language=en-US&";
  private autenticate = "https://www.themoviedb.org/authenticate/";
  private session = "https://www.themoviedb.org/authentication/session/new?";
  private searchURL: string;
  private guest_session: any;
  
  constructor(private http: HttpClient) { 
   this.getGuestSession();    
  }

  // Obtener guest_session_id
  getGuestSession(): any{
    // Solicitar guest_session_id --> Se eliminará al cabo de 24hs sin uso
    // https://api.themoviedb.org/3/authentication/guest_session/new?api_key=afbc1995a41f72f35622f748d82068dc
    //this.searchURL = this.dominioURL + "/authentication/guest_session/new?" + this.apiKey;
    //this.http.get(this.searchURL).subscribe( (response) => this.guest_session = response);
  }

  // Buscar películas por nombre
  searchFilms(film: string) {
    //this.searchURL = this.dominioURL + "/search/movie?" + this.apiKey + this.language + "&query=" + film + "&page=1&include_adult=false";
    this.searchURL = this.dominioURL + "movie";
    return this.http.get(this.searchURL);
  }

  // Buscar detalles de una película 
  getMovieDetails(id: number) {
    this.searchURL = this.dominioURL + "/movie/"  + id + "?" + this.apiKey + this.language;
    return this.http.get(this.searchURL);
  }

  // Buscar películas en cartelera
  searchNowPlayingMovies() {
    //this.searchURL = this.dominioURL + "/movie/now_playing?" + this.apiKey + this.language + "&page=1";
    this.searchURL = this.dominioURL + "/movie/movie/now-playing";

    return this.http.get(this.searchURL);
  }

  // Buscar películas populares
  searchPopularMovies() {
    //this.searchURL = this.dominioURL + "/movie/popular?page=1" + this.language + this.apiKey;
    this.searchURL = this.dominioURL + "/movie/movie/popular";
    return this.http.get(this.searchURL);
  }

  //Votar una película
  rateMovie(id: number, vote: number){
    let body_rate: any = {};

    // Rate the movie (con guest_sesion_id)
    // https://api.themoviedb.org/3/movie/{movie_id}/rating?api_key=afbc1995a41f72f35622f748d82068dc&guest_session_id=<<guest_session_id>>
    body_rate.value = vote;
    this.searchURL = this.dominioURL + "/movie/" + id + "/rating?" + this.apiKey + "&guest_session_id=" + this.guest_session.guest_session_id;
    return this.http.post(this.searchURL, body_rate);


    /* Sin guest_session_id
    //let response_token;
    //let response_session;
    //let body_session: any = {};

    //Create a new request token
    https://api.themoviedb.org/3/authentication/token/new?api_key=afbc1995a41f72f35622f748d82068dc
    response_token = this.http.get(this.dominioURL + "authentication/token/new?" + this.apiKey);
    
    //Autorizhe the request token
    this.http.get(this.autenticate + response_token.token_request + "/allow");
    //create a new session id
    body_session.request_token = response_token;
    response_session = this.http.post(this.session + this.apiKey, body_session);
    */
  
  }

}
