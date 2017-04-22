import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Article } from '../model/article';

@Injectable()
export class ArticleService {

  private createArticleEndPoint = 'http://127.0.0.1:3000/createArticle';
  private getAllArticlesEndPoint = 'http://127.0.0.1:3000/getAllArticles';

  private _articles: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  public articles: Observable<Article[]> = this._articles.asObservable();

  constructor(private http: Http) { }

  public getArticles(): void {
    // Retrieve jwt from localStorage
    let jwt = localStorage.getItem('token');

    // Create new Headers() object
    const headers = new Headers({
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    });

    // Pass the headers into a new RequestOptions() object
    const options = new RequestOptions({ headers, withCredentials: true });

    this.http.get(this.getAllArticlesEndPoint, options)
      .map((res) => res.json())
      .subscribe((articlesJSON) => {
        // Log JSON res from server
        console.log(articlesJSON);

        const articles = articlesJSON
          .map(articlejson => Article.fromJSON(articlejson));
          console.log(articles);
          this._articles.next(articles);
      });
  }

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

      this.http.post(this.createArticleEndPoint, { article }, options)
        .map((res) => console.log(res))
        .subscribe((response: any) => {
          resolve();
        });

    });
  }
}
