import { Component, OnInit, Input } from '@angular/core';
// Servicio
import { ApiThemoviedbService } from '../api-themoviedb.service';
// Routing
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie: any = {};
  private imgBaseURL = "https://image.tmdb.org/t/p/";
  private imgPosterSize = "w780";
  private message;

  constructor(
    private service: ApiThemoviedbService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getMovieDetails();
  }

  getMovieDetails(): void {
    const id = +this.route.snapshot.paramMap.get('query');
    this.service.getMovieDetails(id)
      .subscribe(data => this.movie = data);
    //this.service.getMovieDetails(id).subscribe(data => console.log(data));
  }

  rateMovie(vote: number): void{
    //const id = +this.route.snapshot.paramMap.get('id');
    //this.service.rateMovie(id, vote);
    this.service.rateMovie(this.movie.id, vote).subscribe( (response) => {
      this.message = "Thanks for voting";
    }, 
    (error) => {
      this.message = "Error, try later";
    });
  }

  // Method that navigates backward one step in the browser's history stack using the Location service.
  goBack(): void {
    this.location.back();
  }

}
