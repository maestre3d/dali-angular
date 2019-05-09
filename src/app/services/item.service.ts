import { GLOBAL } from './global';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Item } from '../models/item';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    public identity;
    public url: string;
    public token;
    public item: Item;

    constructor(private http: HttpClient, private userService: UserService) {
        this.url = GLOBAL.url;
        this.identity = this.userService.getIdentity();
        this.token = this.userService.getToken();
    }

    getQuery(query: string) {
        const url = `${this.url}/${query}`;
        const headers = new HttpHeaders({
            'Authorization': this.userService.getToken()
        });
        return this.http.get(url, {headers});
    }

    getItems() {
        return this.getQuery('item')
                    .pipe(map(data => data));
    }

    getItem(id: string) {
        return this.getQuery(`item/${id}`)
        .pipe(map(data => data));
    }

    deleteItem(id: string) {
        const url = `${this.url}/item/${id}`;
        const headers = new HttpHeaders({
            'Authorization': this.userService.getToken()
        });
        return this.http.delete(url, {headers})
                    .pipe(map(data => data));
    }

    addItem(data: Item) {
        const payload = new HttpParams()
        .set('name', data.name)
        .set('brand', data.brand)
        .set('price', data.price.toString())
        .set('stock', data.stock.toString())
        .set('type', data.type);

        // const json = JSON.stringify(data);

        const url = `${this.url}/item`;
        const headers = new HttpHeaders({
            'Authorization': this.userService.getToken()
        })
        .set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(url, payload, {headers})
                        .pipe(map(res => res));
    }

    updateItem( data: Item ) {
        let payload: any;
        if (!data.name) {
            payload = new HttpParams()
            .set('brand', data.brand)
            .set('price', data.price.toString())
            .set('stock', data.stock.toString())
            .set('type', data.type);
        } else {
            payload = new HttpParams()
            .set('name', data.name)
            .set('brand', data.brand)
            .set('price', data.price.toString())
            .set('stock', data.stock.toString())
            .set('type', data.type);
        }

        // const json = JSON.stringify(data);

        const url = `${this.url}/item/${data._id}`;
        const headers = new HttpHeaders({
            'Authorization': this.userService.getToken()
        })
        .set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.put(url, payload, {headers})
                        .pipe(map(res => res));
    }

    setItem(item: Item) {
        this.item = item;
    }

    getSItem(): Item {
        return this.item;
    }
}
