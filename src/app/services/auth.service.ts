import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as hello from 'hellojs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../model/user';


@Injectable()
export class AuthService {
  // define end point and user attributes
  private authEndPoint = 'http://127.0.0.1:3000/auth/facebook/token';
  private user: User = null;

  // Inject the http module
  constructor(private http: Http, private router: Router) { }

  /*
  - Initate the hellojs environment 
  - Setup application credentials
  - And redirect_uri 
  */
  private helloInit(): void {
    hello.init({
      facebook: '2224281814463029',
    }, {
        redirect_uri: 'http://localhost:3000/auth/facebook/callback',
      });
  }

  /*
  - Use hellojs to handle facebook authorization
  - Use .then() to handle the callback and store the access_token
  - Setup headers and options
  - Make a HTTP call to our own web service
  - To exchange the token for our own JWT
   */
  public loginWithFacebook(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.helloInit();

      hello.login('facebook', { scope: 'public_profile, email' }).then((auth: any) => {
        console.log(auth);
        const socialToken = auth.authResponse.access_token;

        const credentials = {
          accessToken: socialToken,
        };

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions(headers);

        // http post exchange tokens
        this.http.post(this.authEndPoint, credentials, options)
          .map((res) => res.json())
          .subscribe((tokenResponse: any) => {
            const accessToken = tokenResponse.accessToken;
            // save to local storage
            localStorage.setItem('token', accessToken);
            //console.log('tokenResponse', tokenResponse);
            this.user = this.getUserFromToken(accessToken);
            resolve(this.user);
          });
      });
    });
  }

  /*
  - https://jwt.io/introduction/
  - Parse the token
  - Take out the '.' in the token
  - atob() is used to decode a base-64 encoded string
  - https://www.w3schools.com/jsref/met_win_atob.asp
  */
  private getUserFromToken(token: any): User {
    const accessToken = token;
    const tokenBody = accessToken.split('.')[1];
    const user = JSON.parse(atob(tokenBody));
    return user;
  }

  public getUser(): User {
    this.user = this.getUserFromToken(localStorage.getItem('token'));
    return this.user;
  }
  /*
  public getUser(): Promise<User> {
    return new Promise((resolve, reject) => {

      // replace with localstorage get
      // get the token from local storage
      // getUserFromToken(token)

      const token = localStorage.getItem('token');

      this.user = this.getUserFromToken(token);

      console.log("getUser()");
      if(this.user)
        return resolve(this.user);
      else
        return reject('no user found');

      // setTimeout(() => {
      //   console.log("getUser");
      //   if (this.user)
      //     return resolve(this.user);
      //   else
      //     return reject('no user found');
      // });
    });
  }
  */

  public isLoggedIn(): boolean {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
      return false;
    }
    else {
      return true;
    }
  }

}
