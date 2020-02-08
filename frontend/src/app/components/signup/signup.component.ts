import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { passwordValidator } from "../../validations";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  /* Variables */
  private newUser = {
    username: "",
    email: "",
    password: ""
  };
  private signUpForm: FormGroup;
  private errorMessage: string;

  /* Methods */
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl(this.newUser.username, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ]),
      email: new FormControl(this.newUser.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.newUser.password, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(8)
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(8),
        passwordValidator
      ])
    });

    // Metodo que ejecuta la validacion del confirmPassword al tocar la password
    this.signUpForm.controls.password.valueChanges.subscribe(event =>
      this.signUpForm.controls.confirmPassword.updateValueAndValidity()
    );
  }

  // Getters
  get username() {
    return this.signUpForm.get("username");
  }
  get email() {
    return this.signUpForm.get("email");
  }
  get password() {
    return this.signUpForm.get("password");
  }
  get passwordCheck() {
    return this.signUpForm.get("confirmPassword");
  }

  signUp() {
    console.warn(this.signUpForm.value);
    console.warn(this.signUpForm.status);
    // Cargar usuario
    this.newUser.username = this.signUpForm.controls.username.value;
    this.newUser.email = this.signUpForm.controls.email.value;
    this.newUser.password = this.signUpForm.controls.password.value;
    console.warn("Usuario a cargar", this.newUser);
    // Mandar usuario al backend
    this.spinner.show();
    this.authService.signUp(this.newUser).subscribe(
      res => {
        console.log(res);
        // guardar el token como cookie en el localStorage
        localStorage.setItem("token", res.token);
        // Una vez creado el usuario enviarlo a la pagina de signIn para autenticarse
        this.router.navigate(["/signin"]);
        this.spinner.hide();
      },
      err => {
        console.log(err);
        if (err.status === 0) {
          this.errorMessage = "Unable to connect with server";
        }
        this.spinner.hide();
      }
    );
  }
}
