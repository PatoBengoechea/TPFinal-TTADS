import { Component, OnInit } from '@angular/core';
import { ApiThemoviedbService } from '../api-themoviedb.service';

@Component({
  selector: 'app-now-playing-movies',
  templateUrl: './now-playing-movies.component.html',
  styleUrls: ['./now-playing-movies.component.css']
})
export class NowPlayingMoviesComponent implements OnInit {

  private nowPlayingMovies: any = [];
  private dateToday: string;
  

  constructor(private service: ApiThemoviedbService) { }

  ngOnInit() {
    let f = new Date();
    this.searchNowPlayingMovies();
    this.dateToday = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
  }

  searchNowPlayingMovies(): void {
    this.service.searchNowPlayingMovies()
      .subscribe((data: any) => this.nowPlayingMovies = data.movies);
      //console.log(this.service);
      //console.log(this.nowPlayingMovies);
    }

}
