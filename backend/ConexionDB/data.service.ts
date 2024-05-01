import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private url = 'http://localhost:3000/datos';

    constructor(private http: HttpClient) {}

    //GetAll
    obtenerDatos(): Observable<any> {
        return this.http.get(this.url);
    }

}
