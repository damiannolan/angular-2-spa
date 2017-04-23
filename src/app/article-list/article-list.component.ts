import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Observable } from 'rxjs';
import { Article } from '../model/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  // Used for ngFor repeating articles
  // The Observable is not an iterable until getAllArtices() returns
  // Must use async pipe | in html template to allow use of *ngFor
  private articles: Observable<Article[]>;

  constructor(private articleService: ArticleService) { 
    this.articles = articleService.articlesList;
  }

  ngOnInit() {
    this.articleService.getArticles();
    console.log(this.articles);
  }

  liveSearch(evt) {
    const val = evt.target.value;
    this.articleService.filterBy(val);
  }

}
