import { Component, OnInit } from "@angular/core";
import { ApiThemoviedbService } from "../../services/api-themoviedb.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-now-playing-movies",
  templateUrl: "./now-playing-movies.component.html",
  styleUrls: ["./now-playing-movies.component.css"]
})
export class NowPlayingMoviesComponent implements OnInit {
  private nowPlayingMovies: any = [];
  private dateToday: string;
  private errorMessage: string;

  constructor(
    private service: ApiThemoviedbService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    let f = new Date();
    this.searchNowPlayingMovies();
    this.dateToday =
      f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
  }

  searchNowPlayingMovies(): void {
    this.spinner.show();
    this.service.searchNowPlayingMovies().subscribe(
      (response: any) => {
        this.nowPlayingMovies = response.data.movies;
        this.spinner.hide();
      },
      err => {
        console.log(err);
        if (err.status !== 0) this.errorMessage = err.error.message;
        if (err.status === 0)
          this.errorMessage = "Unable to connect with server";
        this.spinner.hide();
      }
    );
  }
}
