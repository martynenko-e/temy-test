import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user'
import { Status } from '../shared/models/status'
import { UserService } from '../shared/services/user.service'
import { AuthService } from '../shared/services/auth.service'
import { FilterPipe } from '../filter.pipe'


@Component({
  selector: 'user-list',
  templateUrl: './users.component.html',
})
export class UserComponent implements OnInit {
  dangerstatus: string = "Vacation"
  users: User[];
  statuses: Status[];
  term

  constructor(private userservice: UserService, private authservice: AuthService) { }

  ngOnInit() {
    this.userservice.getStatus().subscribe(statuses => this.statuses = statuses)
    this.userservice.getUsers().subscribe(users => this.users = users.filter(function (user) {
      return user.username !== localStorage.getItem("username")
    }));
  }

}