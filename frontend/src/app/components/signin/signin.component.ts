import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  user = {};
  errorMessage : string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  signIn() {
    this.authService.signIn(this.user).subscribe(
      res => {
        console.log(res);
        // Setear token en el localStorage
        localStorage.setItem("token", res.data.token);
        // Redireccionar a now playing movies
        this.router.navigate(["/now-playing"]);
      },
      err => {
        console.log(err);
        this.errorMessage = err.error.message;
        if(err.name === "HttpErrorResponse"){
          console.log();
        }
        // this.router.navigate(["/signin"]);
      }
    );
  }
}
