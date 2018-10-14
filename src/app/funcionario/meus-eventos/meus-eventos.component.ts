import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Evento } from '../../evento/evento';
import { User } from '../../user/user';
import { EventoService } from '../../evento/evento.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-meus-eventos',
  templateUrl: './meus-eventos.component.html',
  styleUrls: ['./meus-eventos.component.css']
})
export class FuncionarioMeusEventosComponent implements OnInit {
  private eventos: Evento[] = [];
  private user: User;
  private buscarEventos = new FormControl('');

  constructor(
    private router: Router,
    private eventService: EventoService,
    private routeActivated: ActivatedRoute, ) { }

  ngOnInit() {
    this.user = this.routeActivated.snapshot.data['user'];

    this.eventService.getEventsFuncionario(this.user.Id).subscribe(
      (data) => {
        this.eventos = data
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  delete(idEvento: number) {
    let respota = confirm("Deseja realmente excluir esse evento?")
    if (respota) {
      this.eventService.deleteEvento(idEvento).subscribe(
        () => {
          alert('Agenda Excluida com sucesso!');
          this.router.navigate(['/funcionario-dashboard/minhas-agendas']);
        },
        (err: HttpErrorResponse) => {
          if (err.status == 401) {
            alert("Usuario invalido.");
            this.router.navigate(['/login'])
          }
          else
            alert("Falha ao alterar a senha.");
        }
      );

    }
  }
}
