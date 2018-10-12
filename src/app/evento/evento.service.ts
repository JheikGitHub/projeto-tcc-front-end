import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginService } from '../account/login/login.service';
import { Funcionario } from '../funcionario/funcionario';
import { Evento } from './evento';

const URL_API = 'http://localhost:51990';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http: HttpClient, private token: LoginService) {

  }

  numeroDeInscritos(eventoId: number) {
    return this.http.get(URL_API + "/api/evento/numeros-de-inscritos/" + eventoId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token.getToken()
      })
    });
  }

  adicionaEvento(evento: Evento) {
    return this.http.post(URL_API + "/api/evento/adiciona", evento, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token.getToken()
      })
    });
  }

  editarEvento(evento: Evento) {
    return this.http.put(URL_API + "/api/evento/altera/" + evento.Id, evento, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token.getToken()
      })
    });
  }

  deleteEvento(id) {
    return this.http.delete(URL_API + "/api/evento/remove/" + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token.getToken()
      })
    });
  }

  buscaEventoId(id) {
    return this.http.get<Evento>(URL_API + "/api/evento/busca-por-id/" + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token.getToken()
      })
    });
  }

  moderadoresEventos(Eventoid: number) {
    return this.http.get<Funcionario[]>(URL_API + "/api/evento/todos-moderadores/" + Eventoid, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token.getToken()
      })
    });
  }

  detailsEvent(id: number) {
    return this.http.get(URL_API + "/api/evento/busca-por-id/" + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token.getToken()
      })
    });
  }

  getEventsFuncionario(idFuncionario: number) {
    return this.http.get<Evento[]>(URL_API + "/api/evento/busca-eventos-moderador/" + idFuncionario,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + this.token.getToken()
        })
      }
    );
  }

}
