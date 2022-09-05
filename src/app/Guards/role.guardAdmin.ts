import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalErrorComponent } from '../Components/Modal/modal-error/modal-error.component';
import { LoginService } from '../Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardAdmin implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(private authService: LoginService, private router: Router, private dialog: MatDialog) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/iniciarSesion']);
      return false;
    }
    let role = route.data['role'] as string;
    let correo = route.data['correo'] as string;
    if (this.authService.hasRole(role) && this.authService.usuario.correo == correo) {
      return true;
    }
    this.openDialog('Acceso denegado', `Hola ${this.authService.usuario.correo} no tenes acceso a este recurso`);
    this.router.navigate(['/catalogo']);
    return false;
  }
  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }
  
}
