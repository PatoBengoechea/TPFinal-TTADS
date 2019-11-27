import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscarpeliculasComponent } from './buscarpeliculas/buscarpeliculas.component';
import { MovieComponent } from './movie/movie.component';
import { NowPlayingMoviesmovieComponent } from './now-playing-moviesmovie/now-playing-moviesmovie.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscarpeliculasComponent,
    MovieComponent,
    NowPlayingMoviesmovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
