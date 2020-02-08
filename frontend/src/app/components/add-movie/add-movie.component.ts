import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiThemoviedbService } from "../../services/api-themoviedb.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.css"]
})
export class AddMovieComponent implements OnInit {
  private newMovie = {
    name: "",
    genre: "",
    year: "",
    release_date: "",
    img_path: "",
    vote: ""
  };

  private addMovieForm: FormGroup;
  private errorMessage: string;
  private validAdditionMsg: string;

  constructor(
    private movieService: ApiThemoviedbService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  get name() {
    return this.addMovieForm.get("name");
  }
  get genre() {
    return this.addMovieForm.get("genre");
  }
  get year() {
    return this.addMovieForm.get("year");
  }

  ngOnInit(): void {
    this.addMovieForm = new FormGroup({
      name: new FormControl(this.newMovie.name, Validators.required),
      genre: new FormControl(this.newMovie.genre, Validators.required),
      year: new FormControl(this.newMovie.year, Validators.required),
      releaseDate: new FormControl(this.newMovie.release_date),
      poster: new FormControl(this.newMovie.img_path),
      vote: new FormControl(this.newMovie.vote)
    });
  }

  addMovie() {
    console.warn(this.addMovieForm.value);
    console.warn(this.addMovieForm.status);

    // Cargar pelicula
    this.newMovie.name = this.addMovieForm.controls.name.value;
    this.newMovie.genre = this.addMovieForm.controls.genre.value;
    this.newMovie.year = this.addMovieForm.controls.year.value;
    if (this.addMovieForm.controls.releaseDate.value === "")
      this.newMovie.release_date = null;
    else
      this.newMovie.release_date = this.addMovieForm.controls.releaseDate.value;
    if (this.addMovieForm.controls.poster.value === "")
      this.newMovie.img_path = null;
    else this.newMovie.img_path = this.addMovieForm.controls.poster.value;
    if (
      this.addMovieForm.controls.vote.value === "..." ||
      this.addMovieForm.controls.vote.value === ""
    )
      this.newMovie.vote = null;
    else this.newMovie.vote = this.addMovieForm.controls.vote.value;

    console.warn("Pelicula a cargar", this.newMovie);
    // Mandar pelicula al backend
    this.spinner.show();
    this.movieService.createMovie(this.newMovie).subscribe(
      res => {
        console.log(res);
        this.validAdditionMsg = res.data.result;
        this.router.navigate(["/addmovie"]);
        this.spinner.hide();
      },
      err => {
        console.log(err);
        if (err.status === 0) {
          this.errorMessage = "Unable to connect with server";
        }
        else this.errorMessage = err.error.message;
        this.spinner.hide();
      }
    );
  }
}
