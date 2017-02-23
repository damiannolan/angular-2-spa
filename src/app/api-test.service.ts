import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  private apiUrl = "http://127.0.0.1:3000/healthcheck";

  constructor(private http: Http) { }

  makeHttpRequest(): Observable<Object> {
    return this.http.get(this.apiUrl)
      .map(this.extractData)
      .catch(this.handleError); 
  }

  private extractData(res: Response) {
    console.log(res);
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
