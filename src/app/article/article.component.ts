import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../model/article';
import * as moment from 'moment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;

  createdAtFromNow: string;

  constructor() { }

  ngOnInit() {
    //console.log(this.article);

    // Use moment to calculate the time in 'timeago' or relative time
    //this.article.createdAt = moment(this.article.createdAt).fromNow();
    this.createdAtFromNow = moment(this.article.createdAt).fromNow();
  }

}
