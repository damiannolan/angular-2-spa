import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PicklistService } from '../services/picklist.service';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {

  private postForm : FormGroup;

  private categoryList : string[];

  constructor(private picklist: PicklistService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.picklist.getCategories().then((categoryList: string[]) => {
      this.categoryList = categoryList;
      console.log(this.categoryList);
    })
    //this.categoryList = this.picklist.getCategories();
    
  }

}
