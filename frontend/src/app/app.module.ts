import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "../../node_modules/@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { environment } from "../environments/environment"
import { AngularFireModule} from "@angular/fire"
import { AngularFireStorageModule} from '@angular/fire/storage'
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
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { ActorComponent } from './components/actor/actor.component';
import { DpDatePickerModule } from 'ng2-date-picker';

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
    SigninComponent,
    AddMovieComponent,
    ActorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    DpDatePickerModule
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
