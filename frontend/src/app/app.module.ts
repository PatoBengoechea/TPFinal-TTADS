import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "../../node_modules/@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';

// Service
import { ApiThemoviedbService } from "./services/api-themoviedb.service";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./auth.guard";
import { TokenInterceptorService } from "./services/token-interceptor.service";

// Routing
import { AppRoutingModule } from ".//app-routing.module";

// Components
import { AppComponent } from "./app.component";
import { BuscarpeliculasComponent } from "./components/buscarpeliculas/buscarpeliculas.component";
import { NowPlayingMoviesComponent } from "./components/now-playing-movies/now-playing-movies.component";
import { HomeComponent } from "./components/home/home.component";
import { PopularMoviesComponent } from "./components/popular-movies/popular-movies.component";
import { MovieComponent } from "./components/movie/movie.component";
import { MovieDetailsComponent } from "./components/movie-details/movie-details.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SignupComponent } from "./components/signup/signup.component";
import { SigninComponent } from "./components/signin/signin.component";

@NgModule({
  declarations: [
    AppComponent,
    BuscarpeliculasComponent,
    NowPlayingMoviesComponent,
    HomeComponent,
    PopularMoviesComponent,
    MovieComponent,
    MovieDetailsComponent,
    NavbarComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiThemoviedbService, 
    AuthService, 
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
