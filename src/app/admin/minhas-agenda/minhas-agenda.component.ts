import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { Agenda } from '../../agenda/agenda';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { AgendaService } from '../../agenda/agenda.service';

@Component({
  selector: 'app-admin-minhas-agenda',
  templateUrl: './minhas-agenda.component.html'
})
export class AdminMinhasAgendaComponent implements OnInit {

  private user: User;
  private agendas: Agenda[] = [];
  private message: string = '';

  constructor(
    private router: Router,
    private sppiner: NgxSpinnerService,
    private routeActivated: ActivatedRoute,
    private agendaService: AgendaService
  ) { }

  ngOnInit() {
    this.sppiner.show(),
      this.user = this.routeActivated.snapshot.data['user'];

    this.agendaService.agendasFuncionario(this.user.Id).subscribe(
      (data: Agenda[]) => {
        this.agendas = data
        this.sppiner.hide();
      },
      (err) => {
        console.log(err);
        this.sppiner.hide();
      }
    );

  }

  deleteAgenda(idAgenda: number) {

    let respota = confirm("Deseja realmente excluir essa agenda?")
    if (respota) {
      this.agendaService.deleteAgenda(idAgenda).subscribe(
        () => {
          alert('Agenda Excluida com sucesso!');
          this.router.navigate(['/funcionario-dashboard/minhas-agendas']);
        },
        (err: HttpErrorResponse) => {
          if (err.status == 401)
            this.message = "Username ou senha inválida.";
          else {
            this.message = "Falha ao busca evento. Tente novamente";
          }
        }
      );

    }
  }


}
