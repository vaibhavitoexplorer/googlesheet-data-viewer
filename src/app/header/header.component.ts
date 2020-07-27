import { Component } from '@angular/core';
import { ApiService } from '../shared-module/services/api.service';
declare const gapi: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showButton: any;
  _this = this;

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.showButton = localStorage.getItem("isLoggedIn");
  }

  handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }
  
  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }
}
