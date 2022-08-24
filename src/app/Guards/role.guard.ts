import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  // constructor(private authService: AuthService, private router: Router) {

  // }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  //   if (!this.authService.isAuthenticated()) {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  //   let role = route.data['role'] as string;

  //   if (this.authService.hasRole(role)) {
  //     return true;
  //   }
  //   Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tenes acceso a este recurso`, 'warning');
  //   this.router.navigate(['/clientes']);
  //   return false;
  // }
  
}
