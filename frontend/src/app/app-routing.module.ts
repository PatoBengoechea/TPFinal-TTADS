import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes a direccionar
import { HomeComponent } from './home/home.component';
import { BuscarpeliculasComponent } from './buscarpeliculas/buscarpeliculas.component';
import { NowPlayingMoviesComponent } from './now-playing-movies/now-playing-movies.component';
import { popularMoviesComponent } from './popular-movies/popular-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const routes: Routes=[
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'popular', component: popularMoviesComponent},
  {path: 'now-playing', component: NowPlayingMoviesComponent},
  {path: 'search-movies', component: BuscarpeliculasComponent},
  {path: 'movie-details/:query', component: MovieDetailsComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})

export class AppRoutingModule { }
