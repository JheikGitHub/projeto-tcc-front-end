import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TopicoDiscussao } from './topicos-discussao/topico-discussao';
import { Comentario } from './comentarios/comentario';
import { LoginService } from '../account/login/login.service';

const URL_API = 'http://localhost:51990/api/';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient, private token: LoginService) { }

  deletaTopico(TopicoId) {
    return this.http.delete(URL_API + "forun/remove-topico/" + TopicoId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token.getToken()
      })
    })
  }

  editarTopico(topico: TopicoDiscussao) {
    return this.http.put(URL_API + "forun/altera-topico/"+topico.Id, topico, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token.getToken()
      })
    })
  }

  adicionarTopico(topico: TopicoDiscussao) {
    return this.http.post(URL_API + "forun/adiciona-topico", topico, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token.getToken()
      })
    })
  }

  buscaTopicoNome(nomeTopico) {
    return this.http.get<TopicoDiscussao>(URL_API + "forun/busca-topicos-por-nome/" + nomeTopico, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.token.getToken()
      })
    })
  }

  getAllTopicosDiscussao(nomeEvento: string): Observable<TopicoDiscussao[]> {
    return this.http.get<TopicoDiscussao[]>(URL_API + 'forun/busca-topicos-do-evento-por-nome/' + nomeEvento)
  }

  getAllComentariosTopicoDiscussao(nomeTopico: string): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(URL_API + 'forun/busca-todos-comentarios-por-nome-topico-discussao/' + nomeTopico)
  }
}