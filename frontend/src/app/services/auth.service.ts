import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private URL = "http://localhost:3000/api/authentication";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signUp(newUser) {
    // se puede mejorar poniendo interfaz para el tipo de dato de usuario
    return this.http.post<any>(this.URL + "/signup", newUser);
  }

  signIn(user) {
    return this.http.post<any>(this.URL + "/signin", user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
