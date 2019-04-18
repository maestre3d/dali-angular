import { GLOBAL } from '../services/global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public identity;
    public url: string;
    public token;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    logIn(user: any, getToken?: string) {
        if ( getToken ) {
            user.getToken = getToken;
        }
        const json = JSON.stringify(user);
        const params = json;
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.http.post(this.url + 'login', params, {headers})
                    .pipe(map(res => res ));
    }

    getIdentity() {
        const identity = JSON.parse(localStorage.getItem('identity'));

        if (identity !== 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        const token = localStorage.getItem('token');

        if (token !== 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

}
