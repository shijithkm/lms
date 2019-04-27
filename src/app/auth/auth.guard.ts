import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ActivatedRoute
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    // Check the user is authorized to access this page else redirect to access denied page 
    if (this.authService.isUserLoggedIn()) {
      const allowedRoles = next.data.allowedRoles;
      this.authService.isAuthorized(allowedRoles, url);
    }
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    if (this.authService.isUserLoggedIn()) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }
}
