import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicoDiscussao } from './topicos-discussao/topico-discussao';
import { HttpClient } from '@angular/common/http';
import { Comentario } from './comentarios/comentario';

const URL_API = 'http://localhost:51990/api/';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) {}

  getAllTopicosDiscussao(nomeEvento: string): Observable<TopicoDiscussao[]>{
    return this.http.get<TopicoDiscussao[]>(URL_API + 'forun/busca-topicos-do-evento-por-nome/' + nomeEvento)
  }

  getAllComentariosTopicoDiscussao(nomeTopico: string): Observable<Comentario[]>{
    return this.http.get<Comentario[]>(URL_API + 'forun/busca-todos-comentarios-por-nome-topico-discussao/' + nomeTopico)
  }
}