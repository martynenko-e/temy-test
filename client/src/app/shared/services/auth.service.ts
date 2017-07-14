import { Injectable } from '@angular/core'
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { User } from '../models/user'

@Injectable()
export class AuthService {
    private username: string;
    private userstatus: string;
    private userid: string;
    private changeUserUrl: string = window.location.protocol + "//"
    + window.location.hostname + ":" + window.location.port + '/api/v2/users/'
    private loginUrl: string = window.location.protocol + "//"
    + window.location.hostname + ":" + window.location.port + '/api/auth/login/'
    private logoutUrl: string = window.location.protocol + "//"
    + window.location.hostname + ":" + window.location.port + '/api/auth/logout/'
    private isAutentificated: boolean = false
    private currentUser: User;
    constructor(private http: Http) {
        this.isAutentificated = !!localStorage.getItem("username")
        this.username = localStorage.getItem("username")
        this.userstatus = localStorage.getItem("status")
    }
    /**
     * Handle any errors from the API
     * @param error 
     */
    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    /**
     * Extact data from Response
     * @param res 
     */
    private extractData(res: Response) {
        // return res.status;
        // console.log(res)
        let body = res.json();
        return body || {};
    }


    /**
     * Login current user
     */
    login(username: string): Observable<User> {
        // console.log("loggin in")
        let headers;
        headers = new Headers({
            'Content-Type': 'application/json',
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.loginUrl, { username }, options)
            .map(this.extractData)
            .do(res => {
                if (res.username) {
                    localStorage.setItem("username", res.username)
                    localStorage.setItem("status", res.status)
                    localStorage.setItem("id", res.id)
                    this.username = res.username;
                    this.userstatus = res.status;
                    this.userid = res.id;
                    this.isAutentificated = true
                }
            })
            .catch(this.handleError)
    }

    /**
     * Logout current user
     */
    logout() {
        let headers;
        headers = new Headers({
            'Content-Type': 'application/json',
        });
        localStorage.removeItem("username")
        localStorage.removeItem("status")
        localStorage.removeItem("id")
        this.username = ""
        this.userstatus = ""
        this.isAutentificated = false
        let options = new RequestOptions({ headers: headers });
        // console.log(this.logoutUrl)
        return this.http.post(this.logoutUrl, {}, headers)
    }

    isLoggedIn() {
        return this.isAutentificated
    }

    getUserName(): string {
        return this.username
    }

    getUserStatus() {
        return this.userstatus
    }

    getUserId() {
        return this.userid
    }

    changeUserStatus(status: string, id: string): Observable<User> {
        // console.log("Your make request for change status " + status)
        // console.log(this.changeUserUrl + id + "/")
        let url = this.changeUserUrl + id + "/"
        let headers
        if (document.getElementsByName("csrfmiddlewaretoken").length > 0) {
            headers = new Headers({
                'Content-Type': 'application/json',
                'X-CSRFToken': document.getElementsByName("csrfmiddlewaretoken")[0]['value']
            });
        } else {
            headers = new Headers({ 'Content-Type': 'application/json' });
        }
        let options = new RequestOptions({ headers: headers });
        return this.http.put(url, { "status": status }, options)
            .map(this.extractData)
            .do(res => {
                if (res.username) {
                    this.currentUser = res
                    // console.log(this.currentUser)
                }
            })
            .catch(this.handleError)
    }

    getCurrentUser(): User {
        return this.currentUser
    }

}