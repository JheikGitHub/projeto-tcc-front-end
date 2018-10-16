import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Agenda } from './agenda';
import { Observable } from 'rxjs';
import { Evento } from '../evento/evento';
import { Subscribe } from '../evento/subscribe';
import { LoginService } from '../account/login/login.service';

const URL_API = 'http://localhost:51990/api/';

@Injectable({
    providedIn: 'root'
})
export class AgendaService {

    constructor(private http: HttpClient, private token: LoginService) { }

    EditAgenda(idAgenda: number, agenda: Agenda) {
        return this.http.put(URL_API + "/agenda/altera/" + idAgenda, agenda, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    deleteAgenda(idAgenda: number) {
        return this.http.delete(URL_API + "/agenda/remove/" + idAgenda, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    agendasFuncionario(idFuncionario: number) {
        return this.http.get<Agenda[]>(URL_API + "funcionario/agendas-do-funcionario/" + idFuncionario, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        })
    }

    getAgendaId(idAgenda) {
        return this.http.get<Agenda>(URL_API + "/agenda/busca-por-id/" + idAgenda, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    createAgenda(agenda: Agenda) {
        return this.http.post(URL_API + "/agenda/adiciona", agenda, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    getAllAgendas() {
        return this.http.get(URL_API + "/agenda/busca-todos");
    }

    getAgenda(nomeAgenda: string): Observable<Agenda> {
        return this.http.get<Agenda>(URL_API + 'agenda/filtrar-agenda/' + nomeAgenda)
    }

    getEventosAgenda(nomeAgenda: string): Observable<Evento[]> {
        return this.http.get<Evento[]>(URL_API + 'agenda/todos-os-eventos-da-agenda/' + nomeAgenda)
    }

    getEvento(nomeEvento: string): Observable<Evento> {
        return this.http.get<Evento>(URL_API + 'evento/busca-por-nome/' + nomeEvento)
    }

    verificarInscricao(subscribe: Subscribe): Observable<boolean> {
        return this.http.post<boolean>(URL_API + 'usuario/verificar-inscricao', subscribe)
    }

    realizarInscricao(inscricao: Subscribe) {
        return this.http.post<Subscribe>(URL_API + "usuario/inscricao", inscricao)
    }

    cancelarInscricao(inscricao: Subscribe) {
        return this.http.post<Subscribe>(URL_API + "usuario/cancelar-inscricao", inscricao)
    }
}