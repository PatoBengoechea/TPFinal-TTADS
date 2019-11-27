import { Component, OnInit, Input } from '@angular/core';
// Routing
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() movie;
  private imgBaseURL = "https://image.tmdb.org/t/p/";
  private imgPosterSize = "w780";

  constructor(private route: Router) { }

  ngOnInit() { }

  search(id: number){
    this.route.navigate(['movie-details', id])
  }
  
}
