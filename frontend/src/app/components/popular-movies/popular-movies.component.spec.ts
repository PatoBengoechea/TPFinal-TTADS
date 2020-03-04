import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";

import { PopularMoviesComponent } from "./popular-movies.component";

import { ApiThemoviedbService } from "../../services/api-themoviedb.service";
import { NgxSpinnerService, NgxSpinnerModule } from "ngx-spinner";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MovieComponent } from "../movie/movie.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
/*
class MockMovieService extends ApiThemoviedbService {
  data: any = [];
}
 */
describe("popularMoviesComponent", () => {
  let component: PopularMoviesComponent;
  let fixture: ComponentFixture<PopularMoviesComponent>;
  let service: ApiThemoviedbService;
  // let service: MockMovieService;
  let spinner: NgxSpinnerService;
  let http: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopularMoviesComponent, MovieComponent],
      imports: [
        NgxSpinnerModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [ApiThemoviedbService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /*
  beforeEach(() => {
    service = new MockMovieService(http);
    spinner = new NgxSpinnerService();
    component = new PopularMoviesComponent(service, spinner);
  });
 */
  afterEach(() => {
    service = null;
    spinner = null;
    component = null;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Should get the data", fakeAsync(() => {
    /* service.data = {
      movie1: "Here is some mock data",
      movie2: "Here is more mock data"
    }; */
    fixture.componentInstance.searchpopularMovies();
    tick();
    fixture.detectChanges();
    expect(component.searchpopularMovies()).toHaveBeenCalled();
  }));

});
