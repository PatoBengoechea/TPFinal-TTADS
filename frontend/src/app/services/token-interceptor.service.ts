import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // Metodo que intercepta cada peticion para agregar el token
  intercept(req, next) {
    // Metodo que copia la cabecera y agrega el 'Bearer' al token
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    // Devolver cabecera con el bearer-token
    return next.handle(tokenReq);
  }
}
