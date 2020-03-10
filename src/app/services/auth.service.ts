import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  private _sub: string;
  private firstLogin: boolean = false;

  auth0 = new auth0.WebAuth({
    clientID: environment.auth.CLIENT_ID,
    domain: environment.auth.CLIENT_DOMAIN,
    responseType: 'token id_token',
    redirectUri: environment.auth.REDIRECT,
    scope: 'openid'
  });

  constructor(public router: Router) {
    this._idToken = '';
    this._accessToken = '';
    this._sub = '';
    this._expiresAt = 0;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  get sub(): string {
    return this._sub;
  }

  public login(): void {
    this.firstLogin = true;
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      console.log(authResult);
      console.log(err);
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/login-successful']);
      } else if (err) {
        //TODO handle login error
        //this.router.navigate(['/login-successful']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    console.log(authResult);
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    console.log(expiresAt);
    console.log( new Date().getTime());
    console.log(authResult.idTokenPayload.sub);
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
    this._sub = authResult.idTokenPayload.sub;
  }

  public renewSession(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this._expiresAt;
  }

}