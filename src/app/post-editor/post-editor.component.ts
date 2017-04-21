import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PicklistService } from '../services/picklist.service';
import { Article } from '../model/article';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {

  
  private postForm: FormGroup;

  private categoryList: string[];

  constructor(private picklist: PicklistService, public formBuilder: FormBuilder) {

    this.postForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      body: ['', Validators.compose([Validators.required])]
    });

    //this.postForm.setValue({category: this.categoryList[0]});
  }

  ngOnInit() {
    // Populate the categoryList via the PicklistService
    this.picklist.getCategories().then((categoryList: string[]) => {
      this.categoryList = categoryList;

      console.log(this.categoryList);
    });
  }

  onSubmit(value: Article) {
    console.log(value);
  }

}
