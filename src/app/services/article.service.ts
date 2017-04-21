import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Article } from '../model/article';

@Injectable()
export class ArticleService {

  private createArticleEndPoint = 'http://127.0.0.1:3000/createArticle';

  constructor(private http: Http) { }

  public createArticle(article: Article): Promise<any> {
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

      this.http.post(this.createArticleEndPoint, {article}, options)
        .map((res) => console.log(res))
        .subscribe((response:any) => {
          resolve();
        });

    });
  }
}
