import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
=======
import { BuscarpeliculasComponent } from './buscarpeliculas/buscarpeliculas.component';
import { MovieComponent } from './movie/movie.component';
import { NowPlayingMoviesmovieComponent } from './now-playing-moviesmovie/now-playing-moviesmovie.component';
>>>>>>> 6db18e80930b6a996ce5852864519ae1edaf3b22

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    HomeComponent,
    MovieDetailsComponent,
    PopularMoviesComponent
=======
    BuscarpeliculasComponent,
    MovieComponent,
    NowPlayingMoviesmovieComponent
>>>>>>> 6db18e80930b6a996ce5852864519ae1edaf3b22
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
