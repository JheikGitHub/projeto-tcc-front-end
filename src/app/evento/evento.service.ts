import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginService } from '../account/login/login.service';
import { Evento } from './evento';
import { EventoVerificacaoNome } from './evento-verificacao-nome';
import { CancelamentoEvento } from './cancelamento-evento';
import { Participant } from '../participante/participante';

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

  moderadoresEvento(Eventoid: number) {
    return this.http.get(URL_API + "/api/evento/busca-moderadores-evento/" + Eventoid
    );
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

  verificarNomeEventoExistente(evento: EventoVerificacaoNome){
    return this.http.post(URL_API + '/api/evento/verificar-nome-evento', evento)
  }

  cancelarEvento(evento: CancelamentoEvento) {
    return this.http.post(URL_API + "/api/evento/cancelar-evento/", evento);
  }

  listarInscritosEvento(idEvento: number){
    return this.http.get<Participant[]>(URL_API + '/api/evento/participantes-inscritos-no-evento/' + idEvento)
  }

}
