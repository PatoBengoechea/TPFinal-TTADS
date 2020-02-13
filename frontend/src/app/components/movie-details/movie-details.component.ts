import { Component, OnInit, Input } from '@angular/core';
// Servicio
import { ApiThemoviedbService } from '../../services/api-themoviedb.service';
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
  private monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  constructor(
    private service: ApiThemoviedbService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getMovieDetails();
  }

  getMovieDetails(): void {
    var id = this.route.snapshot.paramMap.get('query')
    this.service.getMovieDetails(id).subscribe((data: any) => { this.movie = data.data.movies[0]
      let date = new Date(this.movie.release_date)
      this.movie.parsedDate = this.monthNames[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear()
    });
  }

  goBack(): void {
    this.location.back();
  }

}
