import { Component, OnInit } from '@angular/core';

import { User } from './shared/models/user'
import { UserService } from './shared/services/user.service'
import { AuthService } from './shared/services/auth.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private authservice: AuthService) {

  }

  ngOnInit() {

  }

  logout() {
    this.authservice.logout().subscribe()
  }

  get isLoggedIn() {
    return this.authservice.isLoggedIn()
  }

}
