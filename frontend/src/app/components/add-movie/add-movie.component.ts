import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiThemoviedbService } from "../../services/api-themoviedb.service";
import { Router } from "@angular/router";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.css"]
})
export class AddMovieComponent implements OnInit {
  private newMovie = {
    name: null,
    genre: null,
    year: null,
    release_date: null,
    img_path: null,
    vote: null
  };

  private addMovieForm: FormGroup;
  private errorMessage: string;
  private validAdditionMsg: string;
  private posterFile: File = null;

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

  // Metodo que captura los datos de la imagen
  onFileChanged(event) {
    this.posterFile = <File>event.target.files[0];
  }

  addMovie() {
    console.log("Datos Formulario", this.addMovieForm.value);
    console.log("Imagen Cargada", this.posterFile);

    // Cargar pelicula
    this.newMovie.name = this.addMovieForm.controls.name.value;
    this.newMovie.genre = this.addMovieForm.controls.genre.value;
    this.newMovie.year = this.addMovieForm.controls.year.value;
    if (this.addMovieForm.controls.releaseDate.value !== "")
      this.newMovie.release_date = this.addMovieForm.controls.releaseDate.value;
    if (
      this.addMovieForm.controls.vote.value !== "..." &&
      this.addMovieForm.controls.vote.value !== ""
    )
      this.newMovie.vote = this.addMovieForm.controls.vote.value;
    if (this.posterFile !== null) this.newMovie.img_path = this.posterFile.name;

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
        } else this.errorMessage = err.error.message;
        this.spinner.hide();
      }
    );

    // Cargar Imagen
    /* const fd = new FormData();
    fd.append("poster", this.posterFile, this.posterFile.name);
    // Enviar imagen al backend
    this.movieService.loadMovieImg(fd).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        console.log(
          "Upload Progress",
          Math.round((event.loaded / event.total) * 100) + "%"
        );
      else if (event.type === HttpEventType.Response) console.log(event);
    }); */
  }
}
