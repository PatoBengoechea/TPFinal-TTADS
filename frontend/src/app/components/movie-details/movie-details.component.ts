import { Component, OnInit, Input } from "@angular/core";
// Servicio
import { ApiThemoviedbService } from "../../services/api-themoviedb.service";
// Routing
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastService } from '../../toast-service.service'

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"]
})
export class MovieDetailsComponent implements OnInit {
  @Input() movie: any = {};
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
  private vote = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  private actors: any = {};

  constructor(
    private service: ApiThemoviedbService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private spinner: NgxSpinnerService,
    public toastr: ToastService
  ) {}

  ngOnInit() {
    this.getMovieDetails();
  }

  getMovieDetails(): void {
    var id = this.route.snapshot.paramMap.get("query");
    this.service.getMovieDetails(id).subscribe((data: any) => {
      this.movie = data.data.movies[0];
      let date = new Date(this.movie.release_date);
      this.movie.parsedDate =
        this.monthNames[date.getMonth()] +
        " " +
        date.getDay() +
        ", " +
        date.getFullYear();

      if (this.movie.actors !== undefined) this.actors = this.movie.actors;
    });
  }

  goBack(): void {
    this.location.back();
  }

  rateMovie(rate): void {this.spinner.show();
    this.service.rateMovie(this.movie._id, rate).subscribe((data: any) => {
    this.spinner.hide()
    this.toastr.success("Thank for vote!", "Vote Sent")
    });
    // this.router.navigate(["movie-details", this.movie._id]);
    this.reloadComponent();
  }

  reloadComponent(): void {
    this.spinner.show()
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["movie-details", this.movie._id]);
    this.ngOnInit();
    this.spinner.hide()
  }
}
