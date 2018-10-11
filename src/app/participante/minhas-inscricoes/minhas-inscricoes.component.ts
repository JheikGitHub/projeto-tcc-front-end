import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '../../user/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { Evento } from '../../events/evento';
import { ParticipanteService } from '../participante.service';

@Component({
  selector: 'app-minhas-inscricoes',
  templateUrl: './minhas-inscricoes.component.html',
  styleUrls: ['./minhas-inscricoes.component.css']
})
export class MinhasInscricoesComponent implements OnInit {

  user: User;
  events: Evento[] = []
  eventoDesinscricao: Evento;
  mensagem = ''

  constructor(
    private activated: ActivatedRoute,
    private service: ParticipanteService,
    private route: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.user = this.activated.snapshot.data['user'];

    this.spinner.show();
    this.service.myEscriptionsEvent(this.user.Id).subscribe(
      (data: Evento[]) => { this.events = data, this.spinner.hide() },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          alert("Usuario invalido.");
          this.route.navigate(['/login'])
        }
        else
          alert("Falha ao busca eventos. Por favor tente mais tarde.");
      }
    );
  }

  cancelarInscricao(eventoDesinscricao: Evento) {
    this.eventoDesinscricao = eventoDesinscricao
  }

  confirmarDesinscricao() {

    this.service.cancelSubscribe(this.user.Id, this.eventoDesinscricao.Id)

    this.mensagem = 'Sua inscrição no evento ' + this.eventoDesinscricao.Nome + ' foi cancelada com sucesso.'
    setTimeout(() => {
      this.mensagem = ''
    }, 5000);

  }

}
