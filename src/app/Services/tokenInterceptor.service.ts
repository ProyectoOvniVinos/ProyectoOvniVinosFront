import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private loginService: LoginService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      let token = this.loginService.token;

      if(token != null){
          const authReq = req.clone({
              headers: req.headers.set('Authorization', 'Bearer ' + token) 
          });
          return next.handle(authReq);
      }

      return next.handle(req);
  }
}
