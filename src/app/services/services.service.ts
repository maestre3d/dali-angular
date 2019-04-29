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
        const url = `${GLOBAL.url}/${query}`;
        const headers = new HttpHeaders({
            'Authorization': this.userService.getToken()
        });
        return this.http.get(url, {headers});
    }


    getServices() {
        return this.getQuery(`service`)
                    .pipe(map(data => data));
    }

    deleteBook(query: string){
        const url = `${GLOBAL.url}/booking/${query}`;
        const headers = new HttpHeaders({
            'Authorization': this.userService.getToken()
        });
        return this.http.delete(url, {headers}).pipe(map(data => data));
    }

    bookDate(data: any) {
        console.log(data);
        const payload = new HttpParams()
        .set('employee', data.employee)
        .set('costumer', data.costumer)
        .set('service', data.service)
        .set('time', data.time);

        const json = JSON.stringify(data);
        const params = json;

        return this.http.post(this.url + '/booking', payload,
        {headers: new HttpHeaders().set('Authorization', this.userService.getToken())
        .set('Content-Type', 'application/x-www-form-urlencoded')
        }).pipe(map(res => res ));
    }

}
