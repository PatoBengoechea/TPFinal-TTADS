import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Componentes a direccionar
import { HomeComponent } from "./components/home/home.component";
import { BuscarpeliculasComponent } from "./components/buscarpeliculas/buscarpeliculas.component";
import { NowPlayingMoviesComponent } from "./components/now-playing-movies/now-playing-movies.component";
import { PopularMoviesComponent } from "./components/popular-movies/popular-movies.component";
import { MovieDetailsComponent } from "./components/movie-details/movie-details.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";

// Guard
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {
    path: "popular",
    component: PopularMoviesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "now-playing",
    component: NowPlayingMoviesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "search-movies",
    component: BuscarpeliculasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "movie-details/:query",
    component: MovieDetailsComponent,
    canActivate: [AuthGuard]
  },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
