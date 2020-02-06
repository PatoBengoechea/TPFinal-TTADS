import { Component, OnInit } from "@angular/core";
import { ApiThemoviedbService } from "../../services/api-themoviedb.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-popular-movies",
  templateUrl: "./popular-movies.component.html",
  styleUrls: ["./popular-movies.component.css"]
})
export class PopularMoviesComponent implements OnInit {
  private popularMovies: any = [];

  constructor(private service: ApiThemoviedbService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.searchpopularMovies();
  }

  searchpopularMovies(): void {
    this.spinner.show()
    this.service
      .searchPopularMovies()
      .subscribe(
        (response: any) => { (this.popularMovies = response.data.movies)
          this.spinner.hide()
        }
      );
    //this.service.searchPopularMovies().subscribe((response:any)=> console.log(response.results));
  }
}
