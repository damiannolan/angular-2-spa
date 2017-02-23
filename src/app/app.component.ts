import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api-test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'app works!';
  
  constructor(private apiService: ApiService) {

  }

  getMessage() {
    this.apiService.makeHttpRequest()
      .subscribe(
        resp => console.log(resp),
        error => console.log(error)
      );
  }
  
}
