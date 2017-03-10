import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class AuthGuard implements CanActivate {
  /*
  - https://blog.thoughtram.io/angular/2016/07/18/guards-in-angular-2.html
  */
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean/*Promise<boolean>*/ {
    let url: string = state.url;

    //return this.checkLogin(url);
    return this.authService.isLoggedIn();
  }


  // Can maybe change to use an isLoggedIn() function from AuthService
  // isLoggedIn() will check if a user/token is present in localstorage
  // Returning either true or false
  checkLogin(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.getUser()
        .then((user) => {
          console.log("user resolved to ", user);
          resolve(user ? true : false);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
}
