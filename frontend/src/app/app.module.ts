import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscarpeliculasComponent } from './buscarpeliculas/buscarpeliculas.component';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NowPlayingMoviesComponent } from './now-playing-movies/now-playing-movies.component';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscarpeliculasComponent,
    HomeComponent,
    MovieComponent,
    MovieDetailsComponent,
    NowPlayingMoviesComponent,
    PopularMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
