import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PicklistService {
  private categoriesEndPoint = 'http://127.0.0.1:3000/categories';
  private categoriesList: string[];

  // DI the Http module
  constructor(private http: Http) { }

  public getCategories(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      // Retrieve jwt from localStorage
      let jwt = localStorage.getItem('token');

      // Create new Headers() object
      const headers = new Headers({
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      });

      // Pass the headers into a new RequestOptions() object
      const options = new RequestOptions({ headers, withCredentials: true });

      // Call the categories backend endpoint, map() & subscribe() the response
      this.http.get('http://localhost:3000/categories', options)
        .map((res) => res.json())
        .subscribe((res: any) => {
          resolve(res as string[]);
        });
    });
  };

}
