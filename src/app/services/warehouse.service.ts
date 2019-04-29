import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WarehouseService {
    url: string;

    constructor(private http: HttpClient){
        this.url = GLOBAL.url;
    }
}
