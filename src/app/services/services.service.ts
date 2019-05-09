import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    public identity;
    public url: string;
    public token;

    constructor(private http: HttpClient, private userService: UserService) {
        this.url = GLOBAL.url;
        this.identity = userService.getIdentity();
    }

    getQuery(query: string) {
        const url = `${this.url}/${query}`;
        const headers = new HttpHeaders({
            'Authorization': this.userService.getToken()
        });
        return this.http.get(url, {headers});
    }


    getServices() {
        return this.getQuery(`service`)
                    .pipe(map(data => data));
    }

    deleteBook(query: string) {
        const url = `${GLOBAL.url}/booking/${query}`;
        const headers = new HttpHeaders({
            'Authorization': this.userService.getToken()
        });
        return this.http.delete(url, {headers}).pipe(map(data => data));
    }

    bookDate(data: any) {
        const headers = new HttpHeaders({
            'Authorization': this.userService.getToken(),
            'Content-Type': 'application/json'
        });
        /*const payload = new HttpParams()
        .set('employee', data.employee)
        .set('costumer', data.costumer)
        .set('service', data.service)
        .set('time', data.time);*/

        const json = JSON.stringify(data);

        return this.http.post(this.url + '/booking', json, {headers}
        ).pipe(map(res => res ));
    }

    activateDate(id: string) {
        const url = `${GLOBAL.url}/user/book/activate/${id}`;
        /*const payload = new HttpHeaders()
        .set('status', '1');*/
        const data = {
            status: 1
        }
        const json = JSON.stringify(data);

        const headers = new HttpHeaders({
            'Authorization': this.userService.getToken(),
            'Content-Type': 'application/json'
        });

        return this.http.put(url, json, {headers})
                        .pipe(map(data => data));
    }

    finishDate(id: string) {
        const url = `${GLOBAL.url}/booking/${id}`;
        /*const payload = new HttpHeaders()
        .set('status', '1');*/
        const data = {
            status: 2
        }
        const json = JSON.stringify(data);

        const headers = new HttpHeaders({
            'Authorization': this.userService.getToken(),
            'Content-Type': 'application/json'
        });

        return this.http.put(url, json, {headers})
                        .pipe(map(data => data));
    }

    getActive() {
        return this.getQuery(`/user/book/active`).pipe(map(data => data));
    }

}
