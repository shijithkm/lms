import { Injectable } from '@angular/core';

import { AuthService as SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FirebaseService } from '../shared/services/firebase.service';
import { Router } from '@angular/router';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;

  constructor(
    private socialAuthService: SocialAuthService,
    private firebaseService: FirebaseService,
    private router: Router
  ) {

  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  isAuthorized({ allowedRoles, url = '/' }: { allowedRoles: string[]; url?: string; }): boolean {

    this.redirectUrl = url;

    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    if (allowedRoles.includes(this.getUserRole()) === false) {
      this.router.navigate(['/accessdenied']);
    }

    return true;
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(async (user) => {
        this.user = user;
        // Default role assigned to the user
        this.user.role = 'user';
        // Add to Firebase Database if its not exists
        await this.firebaseService.addUser(this.user).then(userObj => {
          // Add to Local Storage
          localStorage.setItem('currentUser', JSON.stringify(userObj));
          // Redirect to based on requested url when authentication success
          this.redirectUrl = this.redirectUrl || '/';
          console.log('redirectUrl', this.redirectUrl);
          this.router.navigate([this.redirectUrl]);
        });

        return true;

      })
      .catch(e => console.log(e));
  }

  isTokenValid(): boolean {
    const accessToken = this.getAccessToken();
    if (accessToken == null) {
      return false;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(accessToken);
    this.user = decodedToken;
    const expirationDate = helper.getTokenExpirationDate(accessToken);
    const isExpired = helper.isTokenExpired(accessToken);
    return (isExpired) ? false : true;
  }

  signOut(): void {
    this.socialAuthService.signOut().then(() => {
      this.user = null;
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  isUserLoggedIn(): boolean {
    return this.isTokenValid();
  }

  getUserRole(): string {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).role;
    }
  }

  getAccessToken(): string {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).idToken;
    }
  }

  getCurrentUser() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
  }
}
