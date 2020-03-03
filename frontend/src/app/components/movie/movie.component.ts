import { Component, OnInit, Input } from "@angular/core";
// Routing
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit {
  @Input() movie: any;

  private monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  constructor(private route: Router) {}

  ngOnInit() {
    let date = new Date(this.movie.release_date);
    this.movie.parsedDate =
      this.monthNames[date.getMonth()] +
      " " +
      date.getDay() +
      ", " +
      date.getFullYear();
  }

  goToDetails(movie: any) {
    // console.log(movie._id);
    this.route.navigate(["movie-details", movie._id]);
  }
}
