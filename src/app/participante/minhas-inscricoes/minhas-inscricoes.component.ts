import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '../../user/user';
import { Evento } from '../../evento/evento';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscribe } from '../../evento/subscribe';
import { ParticipanteService } from '../participante.service';
import { AgendaService } from '../../agenda/agenda.service';
import { Agenda } from '../../agenda/agenda';

@Component({
  selector: 'app-minhas-inscricoes',
  templateUrl: './minhas-inscricoes.component.html',
  styleUrls: ['./minhas-inscricoes.component.css']
})
export class MinhasInscricoesComponent implements OnInit {

  private agenda: Agenda;
  private user: User;
  private events: Evento[] = [];
  private eventoDesinscricao: Evento;
  private mensagem: string = '';

  constructor(
    private serviceAgenda: AgendaService,
    private activated: ActivatedRoute,
    private service: ParticipanteService,
    private route: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.user = this.activated.snapshot.data['user'];

    this.spinner.show();
    this.service.myEscriptionsEvent(this.user.Id).subscribe(
      (data: Evento[]) => {
        this.events = data, this.spinner.hide();
      },
      (error: HttpErrorResponse) => {

        if (error.status == 401) {
          this.mensagem = "Usuario invalido.";
          this.route.navigate(['/login'])
        }
        else {
          this.spinner.hide();
          this.mensagem = "Não foi possivel busca os dados"
          setTimeout(() => {
            this.mensagem = ''
          }, 5000);
        }
      }
    );
  }

  cancelarInscricao(eventoDesinscricao: Evento) {
    this.eventoDesinscricao = eventoDesinscricao
  }

  confirmarDesinscricao() {
    let subscribe: Subscribe = { EventoId: this.eventoDesinscricao.Id, ParticipanteId: this.user.Id };

    this.service.cancelSubscribe(subscribe).subscribe(
      () => {
        this.mensagem = 'Sua inscrição no evento ' + this.eventoDesinscricao.Nome + ' foi cancelada com sucesso.'
        setTimeout(() => {
          this.mensagem = ''
        }, 5000);
        this.route.navigate(['/participante-dashboard'])
      },
      (err: HttpErrorResponse) => {
        this.mensagem = err.error.Message;
        setTimeout(() => {
          this.mensagem = ''
        }, 5000);
      }
    );
  }

}
