import { Component, OnInit } from '@angular/core';
import { PicklistService } from '../services/picklist.service';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {

  categoryList : string[];

  constructor(private picklist: PicklistService) { }

  ngOnInit() {
    this.categoryList = this.picklist.getCategories();
  }

}
