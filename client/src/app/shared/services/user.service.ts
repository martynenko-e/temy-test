import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { User } from '../models/user'
import { Status } from '../models/status'

@Injectable()
export class UserService {
    private usersUrl:string = window.location.protocol + "//"
     + window.location.hostname + ":" 
     + window.location.port + '/api/users/?format=json'
    private statusUrl:string = window.location.protocol + "//"
     + window.location.hostname + ":" 
     + window.location.port + '/api/status/?format=json'
    constructor(private http: Http) {
        
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
        // console.error(errMsg);
        return Observable.throw(errMsg);
    }

    /**
     * Extact data from Response
     * @param res 
     */
    private extractData(res: Response) {
        // return res.status;
        let body = res.json();
        return body || { };
    }


    /**
     * Get all users
     */
    getUsers(): Observable<User[]> {
       return this.http.get(this.usersUrl)
       .map(this.extractData)
       .catch(this.handleError)
    }

    /**
     * Get all statuses
     */
    getStatus(): Observable<Status[]> {
        return this.http.get(this.statusUrl)
       .map(this.extractData)
       .catch(this.handleError)
    }

}