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

  constructor(private service: ApiThemoviedbService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    let f = new Date();
    this.searchNowPlayingMovies();
    this.dateToday =
      f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
  }

  searchNowPlayingMovies(): void {

    this.spinner.show()
    this.service
      .searchNowPlayingMovies()
      .subscribe((data: any) => {(this.nowPlayingMovies = data.data.movies)
       this.spinner.hide() 
        
      });

  
    //console.log(this.service);
    //console.log(this.nowPlayingMovies);
  }
}
