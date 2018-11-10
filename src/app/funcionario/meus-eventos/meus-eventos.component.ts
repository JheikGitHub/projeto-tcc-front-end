import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '../../user/user';
import { Evento } from '../../evento/evento';
import { EventoService } from '../../evento/evento.service';
import { CancelamentoEvento } from 'src/app/evento/cancelamento-evento';

@Component({
  selector: 'app-meus-eventos',
  templateUrl: './meus-eventos.component.html',
  styleUrls: ['./meus-eventos.component.css']
})
export class FuncionarioMeusEventosComponent implements OnInit {
  private eventos: Evento[] = [];
  private user: User;
  private eventoCancel: CancelamentoEvento = new CancelamentoEvento()

  nomeEventoSelecionado: string = ''
  imagemEventoSelecionado: string = ''
  idEventoSelecionadao : number
  acaoUsuario: string = ''
  isDelete: boolean = false

  message: string = ''

  private buscarEventos = new FormControl('');

  constructor(
    private router: Router,
    private eventService: EventoService,
  
    private routeActivated: ActivatedRoute, ) { }

  ngOnInit() {
    this.user = this.routeActivated.snapshot.data['user'];
    this.getEventosModerador()
  }

  getEventosModerador(){
    this.eventService.getEventsFuncionario(this.user.Id).subscribe(
      (data) => {
        this.eventos = data
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  delete(evento: Evento) {
    this.nomeEventoSelecionado = evento.Nome
    this.imagemEventoSelecionado = evento.PathImagem
    this.idEventoSelecionadao = evento.Id
    this.isDelete = true
    this.acaoUsuario = 'Confirma a exclusão desse evento?'
  }

  confirmDelete(){
     this.eventService.deleteEvento(this.idEventoSelecionadao).subscribe(
        () => {
          this.getEventosModerador()
          this.message = 'Evento excluído com Sucesso'
          setTimeout(() => {
            this.message = ''
          }, 5000);       
        },
        (err: HttpErrorResponse) => {
          if (err.status == 401) {
            alert("Usuario invalido.");
            this.router.navigate(['/login'])
          }
          else
            alert("Falha ao excluir o evento.");
      })
  }


  cancel(evento: Evento){
    this.nomeEventoSelecionado = evento.Nome
    this.imagemEventoSelecionado = evento.PathImagem
    this.idEventoSelecionadao = evento.Id
    this.isDelete = false
    this.acaoUsuario = 'Confirma o cancelamento desse evento?'
  }

  confirmCancel(){
    this.eventoCancel.EventoId = this.idEventoSelecionadao
    this.eventoCancel.Descricao = "Ocorreram imprevistos e, infelizmente, tivemos que cancelar o evento. Recomendamos que você busque outros eventos no KONOHA."
   
    this.eventService.cancelarEvento(this.eventoCancel).subscribe(
      () => {
        this.getEventosModerador()
        this.message = 'Evento cancelado com Sucesso'
        setTimeout(() => {
          this.message = ''
        }, 5000);       
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.router.navigate(['/login'])
        }
        else
          alert("Falha ao cancelar o evento.");
        })
  }

}
