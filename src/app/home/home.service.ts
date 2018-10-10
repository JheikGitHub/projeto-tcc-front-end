import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Agenda } from '../agenda/agenda';

const URL_API = 'http://localhost:51990/api/';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    constructor(private http: HttpClient) { }

    getAgendasEventos(): Observable<Agenda[]> {
        return this.http.get<Agenda[]>(URL_API + 'agenda/busca-todos')
    }
}
