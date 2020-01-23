import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes a direccionar
import { HomeComponent } from './home/home.component';
import { BuscarpeliculasComponent } from './buscarpeliculas/buscarpeliculas.component';
import { NowPlayingMoviesComponent } from './now-playing-movies/now-playing-movies.component';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes=[
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'popular', component: PopularMoviesComponent},
  {path: 'now-playing', component: NowPlayingMoviesComponent},
  {path: 'search-movies', component: BuscarpeliculasComponent},
  {path: 'movie-details/:query', component: MovieDetailsComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})

export class AppRoutingModule { }
