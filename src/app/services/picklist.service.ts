import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class PicklistService {
  private categoriesEndPoint = 'http://127.0.0.1:3000/categories';
  private categoriesList : string[];

  constructor(private http: Http) { }

  public getCategories(): string[] {
    let jwt = localStorage.getItem('token');

    console.log(jwt);

    const headers = new Headers({
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    });

    const options = new RequestOptions({headers, withCredentials: true});
    console.log(options);
    
    this.http.get('http://localhost:3000/categories', options)
      .map((res) => res.json())
      .subscribe((res: any) => {
        console.log(res);
      });
      
      return this.categoriesList;
  };


}
