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
  private _filterbySearchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _filterbyCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public articlesList: Observable<Article[]>;


  constructor(private http: Http) {
    this.articlesList = Observable.combineLatest(this.articles, this._filterbySearchSubject, this._filterbyCategory)
      .map(([articles, searchStr, category]) => {
        // g - global (all matches), i - insensitive case
        const re = new RegExp(searchStr, 'gi');

        return articles
          .filter(a => re.exec(a.title) || re.exec(a.body))
          .filter(a => a.category === category || category === '')
      });
  }

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

  public filterBy(filter: string): void {
    this._filterbySearchSubject.next(filter);
  }

  public filterByCategory(filter: string): void {
    this._filterbyCategory.next(filter);
  }
}
