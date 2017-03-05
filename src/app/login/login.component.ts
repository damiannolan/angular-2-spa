import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.loginWithFacebook().then((user: User) => {
      // console.log(user);
      // Route to Home component ['/']
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
  }

}
