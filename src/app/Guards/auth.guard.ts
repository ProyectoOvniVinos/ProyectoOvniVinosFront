import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
   // constructor(private authService: AuthService,
  //   private router: Router) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {

  //   if (this.authService.isAuthenticated()) {

  //     if (this.isTokenExpirado()) {
  //       this.authService.logout();
  //       this.router.navigate(['/login']);
  //       return false;
  //     }
  //     return true;
  //   }

  //   this.router.navigate(['/login']);
  //   return false;
  // }
  // isTokenExpirado(): boolean {
  //   let token = this.authService.token;
  //   let payload = this.authService.obtenerDatosToken(token);
  //   let now = new Date().getTime() / 1000;
  //   if (payload.exp < now) {
  //     return true;
  //   }
  //   return false;
  // }
}
