import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Agenda } from '../../../agenda/agenda';
import { AgendaService } from '../../../agenda/agenda.service';
import { Funcionario } from '../../funcionario';
import { User } from 'src/app/user/user';
import { FuncionarioService } from '../../funcionario.service';

@Component({
  selector: 'app-funcionario-detalhes-agenda',
  templateUrl: './detalhes-agenda.component.html',
  styleUrls: ['./detalhes-agenda.component.css']
})
export class FuncionarioDetalhesAgendaComponent implements OnInit {

  private user: User;
  private funcionario: Funcionario = new Funcionario();
  private agenda: Agenda = new Agenda();

  constructor(private routeActivated: ActivatedRoute, private service: AgendaService, private funcionarioService: FuncionarioService) { }

  ngOnInit() {

    this.service.getAgendaId(this.routeActivated.snapshot.params['id']).subscribe(
      (data) => { this.agenda = data },
      (err) => {
        console.log(err);
      }
    );

    this.user = this.routeActivated.snapshot.data['user'];

    this.funcionarioService.buscaFuncionario(this.user.Id).subscribe(
      (data) => {
        this.funcionario = data;     
      },
      (err) => {
        console.log(err);
      }
    );
    
  }

}
