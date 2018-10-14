import { Component, OnInit } from '@angular/core';
import { Agenda } from '../../../agenda/agenda';
import { ActivatedRoute } from '@angular/router';
import { AgendaService } from '../../../agenda/agenda.service';

@Component({
  selector: 'app-funcionario-detalhes-agenda',
  templateUrl: './detalhes-agenda.component.html',
  styleUrls: ['./detalhes-agenda.component.css']
})
export class FuncionarioDetalhesAgendaComponent implements OnInit {

  private agenda: Agenda = new Agenda();

  constructor(private activated: ActivatedRoute, private service: AgendaService) { }

  ngOnInit() {

    this.service.getAgendaId(this.activated.snapshot.params['id']).subscribe(
      (data) => { this.agenda = data },
      (err) => {
        console.log(err);
      }
    );
  }

}
