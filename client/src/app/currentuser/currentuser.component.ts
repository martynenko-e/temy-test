import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service'
import { UserService } from '../shared/services/user.service'
import { Status } from '../shared/models/status'

@Component({
    selector: 'user-info',
    templateUrl: './currentuser.component.html'
})
export class CurrentUserComponent implements OnInit {

    username: string;
    status: string;
    userid: string;
    statuses: Status[];

    constructor(private service: AuthService, private userservice: UserService) { }

    ngOnInit() {
        this.username = this.service.getUserName()
        this.status = this.service.getUserStatus()
        this.userid = this.service.getUserId()
        this.userservice.getStatus().subscribe(statuses => this.statuses = statuses)
    }

    onChangeStatus(event) {
        this.service.changeUserStatus(event.name, localStorage.getItem("id")).subscribe(
            data => {
                localStorage.setItem("status", data.status)
                this.status = data.status
            },
            err => {

            }
        )
    }
}