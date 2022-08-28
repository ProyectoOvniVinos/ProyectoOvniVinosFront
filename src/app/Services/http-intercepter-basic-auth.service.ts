import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let username = 'ovniVinos'
    let password = '12345'
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    console.log(req)

    req = req.clone({
      setHeaders : {
        Authorization : basicAuthHeaderString
      }
    })

    return next.handle(req);
  }
}
