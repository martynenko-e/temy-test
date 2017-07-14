import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service'

@Component({
    selector: 'login-form',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    credentials = {
        username: '',
    }

    constructor(private service: AuthService) { }

    ngOnInit() {

    }

    login() {
        this.service.login(this.credentials.username).subscribe(
            data => {
                // console.log(data)
            },
            err => {

            }
        )
    }
}