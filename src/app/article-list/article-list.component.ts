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

  private articles: Observable<Article[]>;

  constructor(private articleService: ArticleService) { 
    this.articles = articleService.articles;
  }

  ngOnInit() {
    this.articleService.getArticles();
    console.log(this.articles);
  }

}
