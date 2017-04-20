import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user);
  }

  getImageUrl() {
    return atob(this.user.pictureUrl);
  }

}
