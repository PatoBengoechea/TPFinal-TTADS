import { Component, OnInit } from '@angular/core';
import { ApiThemoviedbService } from '../api-themoviedb.service';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css']
})
export class popularMoviesComponent implements OnInit {

  private popularMovies: any = []; 

  constructor(private service: ApiThemoviedbService) { }

  ngOnInit() {
    this.searchpopularMovies();
  }

  searchpopularMovies(): void {
    this.service.searchPopularMovies().subscribe((response:any)=> this.popularMovies = response.movies);
    //this.service.searchPopularMovies().subscribe((response:any)=> console.log(response.results));

  }

}
