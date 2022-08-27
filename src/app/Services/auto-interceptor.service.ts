import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ModalErrorComponent } from '../Components/Modal/modal-error/modal-error.component';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AutoInterceptorService implements HttpInterceptor{

  constructor(private loginService:LoginService,
    public dialog: MatDialog,
    private router:Router){

  }

  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: { title: titleNew, mensaje: mensajeNew },
    });
  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    return next.handle(req).pipe(
      catchError(e=>{
        if(e.status==401){

          if(this.loginService.isAuthenticated()){
            this.loginService.logout();
          }
    
          this.router.navigate(['/iniciarSesion'])
        }
        if(e.status==403){
          this.openDialog("Acceso denegado", "no tiene acceso a este recurso!")
          this.router.navigate(['/catalogo'])
        
        }

        return throwError(e);
      })
      
    );
  }
}
