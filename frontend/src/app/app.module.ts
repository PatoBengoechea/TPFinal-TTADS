import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Service
import { ApiThemoviedbService } from './api-themoviedb.service';

// Routing
import { AppRoutingModule } from './/app-routing.module'; 

// Components
import { AppComponent } from './app.component';
import { BuscarpeliculasComponent } from './buscarpeliculas/buscarpeliculas.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { NowPlayingMoviesComponent } from './now-playing-movies/now-playing-movies.component';
import { HomeComponent } from './home/home.component';
import { popularMoviesComponent } from './popular-movies/popular-movies.component';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscarpeliculasComponent,
    NowPlayingMoviesComponent,
    HomeComponent,
    popularMoviesComponent,
    MovieComponent,
    MovieDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ApiThemoviedbService],
  bootstrap: [AppComponent]
})

export class AppModule { }
