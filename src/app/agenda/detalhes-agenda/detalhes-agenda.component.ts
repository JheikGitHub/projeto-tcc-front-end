import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Agenda } from '../agenda';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-detalhes-agenda',
  templateUrl: './detalhes-agenda.component.html',
  styleUrls: ['./detalhes-agenda.component.css']
})
export class DetalhesAgendaComponent implements OnInit {

  private agenda: Agenda = new Agenda();
  private IdAgenda: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agendaSevice: AgendaService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();

    this.route.params.subscribe(parans => this.IdAgenda = parans['id']);

    console.log(this.IdAgenda);

    this.agendaSevice.getAgendaId(this.IdAgenda).subscribe(
      (data: Agenda) => {
        this.agenda = data
        this.spinner.hide();
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        if (err.status == 401) {
          alert("Usuario não logado");
          this.router.navigate(["/login"])
        }
        else {
          alert("Falha ao busca evento. Tente novamente");
        }
      }
    );


  }


}
