import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './../api-test.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService) {

  }

  getMessage() {
    this.apiService.makeHttpRequest()
      .subscribe(
        resp => console.log(resp),
        error => console.log(error)
      );
  }


  ngOnInit() {
  }

}
