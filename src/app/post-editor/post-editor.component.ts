import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PicklistService } from '../services/picklist.service';
import { Article } from '../model/article';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {

  private postForm: FormGroup;
  private article: Article;
  private categoryList: string[];

  constructor(
    private formBuilder: FormBuilder,
    private picklist: PicklistService,  
    private articleService: ArticleService,        
    private authService: AuthService,  
    private router: Router) {
    
    this.postForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      body: ['', Validators.compose([Validators.required])],
    });
   
  }

  ngOnInit() {
    // Populate the categoryList via the PicklistService
    this.picklist.getCategories().then((categoryList: string[]) => {
      this.categoryList = categoryList;

      this.postForm.setValue({
        title: '',
        category: this.categoryList[0],
        body: ''
      });
      console.log(this.categoryList);

      console.log(this.article);
    });
  }

  onSubmit(postForm: FormGroup) {

    this.article = Object.assign({
      author: this.authService.getUser(),
      createdAt: moment(new Date()).toISOString()},
      postForm.value);

    // Delegate the task of http post for storing the article to the ArticleService
    this.articleService.createArticle(this.article).then((resp: any) => this.router.navigate(['/']));

    // re-direct to home
    //this.router.navigate(['/']);
  }

}
