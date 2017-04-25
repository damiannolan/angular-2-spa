import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Observable } from 'rxjs';
import { Article } from '../model/article';
import { PicklistService } from '../services/picklist.service';
declare var jQuery: any;


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  // Used for ngFor repeating articles
  // The Observable is not an iterable until getAllArtices() returns
  // Must use async pipe | in html template to allow use of *ngFor
  private articles: Observable<Article[]>;
  private categoryList: string[];
  private isFiltered: boolean = false;

  constructor(private articleService: ArticleService, private picklist: PicklistService) {
    this.articles = articleService.articlesList;
  }

  ngOnInit() {

    this.picklist.getCategories().then((categoryList: string[]) => {
      this.categoryList = categoryList;
    });

    this.articleService.getArticles();
    //console.log('ngOnInit ArticleListComponent', this.articles);

    jQuery('.ui.dropdown').dropdown();

    // !! Potential memory issue !!
    // By subscribing on this.articles we can illustrate the state being maintained in the 
    // service and how we can see an increment of values for each time .next() is called on
    // the BehaviorSubject in the service
    //this.articles.subscribe((articles) => console.log('ngOnInit Article List Component', articles));
  }

  ngOnDestroy() {
    // ngOnDestroy gets called when navigating away from the component
    //console.log('ng On Destroy');
  }

  liveSearch(evt) {
    const val = evt.target.value;
    this.articleService.filterBy(val);
  }

  filterByCategory(category) {
    this.articleService.filterByCategory(category);
    this.isFiltered = true;
  }

  clearFilters() {
    this.articleService.filterByCategory('');
    this.isFiltered = false;

    // Wrap reset of span text in setTimeout to ensure it sets in the next tick of the event loop
    setTimeout(() => jQuery('#categoryFilter span').text('Filter Posts'));
  }

}
