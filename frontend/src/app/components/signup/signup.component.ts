import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  newUser = {};

  constructor(
    private authService: AuthService, 
    private router: Router
    ) {}

  ngOnInit() {}

  signUp() {
    console.log(this.newUser);
    this.authService.signUp(this.newUser).subscribe(
      res => {
        console.log(res);
        // guardar el token como cookie en el localStorage
        localStorage.setItem("token", res.token);
        // Una vez creado el usuario enviarlo a la pagina de signIn para autenticarse
        this.router.navigate(['/signin']);
      },
      err => console.log(err)
    );
  }
}
