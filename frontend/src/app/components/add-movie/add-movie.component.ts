import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ApiThemoviedbService } from "../../services/api-themoviedb.service";
import { Router } from "@angular/router";
import { HttpEventType } from "@angular/common/http";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";
import { viewClassName } from "@angular/compiler";
import { DpDatePickerModule } from "ng2-date-picker";

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
    vote: 0
  };

  @ViewChild("imageFilm", { static: false }) inputImageFilm: ElementRef;
  private addMovieForm: FormGroup;
  private errorMessage: string;
  private validAdditionMsg: string;
  private posterFile: File = null;

  uploadPercent: Observable<number>;
  urlImage: Observable<String>;

  constructor(
    private movieService: ApiThemoviedbService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private storage: AngularFireStorage
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
  get poster() {
    return this.addMovieForm.get("poster");
  }
  get releaseDate(){
    return this.addMovieForm.get("releaseDate");
  }

  ngOnInit(): void {
    this.addMovieForm = new FormGroup({
      name: new FormControl(this.newMovie.name, Validators.required),
      genre: new FormControl(this.newMovie.genre, Validators.required),
      year: new FormControl(this.newMovie.year, Validators.required),
      releaseDate: new FormControl(this.newMovie.release_date),
      poster: new FormControl(this.newMovie.img_path, Validators.required)
    });
  }

  // Metodo que captura los datos de la imagen
  onFileChanged(event) {
    const id = Math.random()
      .toString(36)
      .substring(2);
    this.posterFile = <File>event.target.files[0];
    const file = event.target.files[0];
    const filePath = id;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.urlImage = ref.getDownloadURL())))
      .subscribe();
  }

  addMovie() {
    this.newMovie.name = this.addMovieForm.controls.name.value;
    this.newMovie.genre = this.addMovieForm.controls.genre.value;
    this.newMovie.year = this.addMovieForm.controls.year.value;
    if (this.addMovieForm.controls.releaseDate.value !== "")
      this.newMovie.release_date = this.addMovieForm.controls.releaseDate.value;
    if (this.posterFile !== null)
      this.newMovie.img_path = this.inputImageFilm.nativeElement.value;

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
  }
}
