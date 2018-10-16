import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../../user/user';

@Component({
  selector: 'app-funcionario-alterar-dados',
  templateUrl: './alterar-dados.component.html',
  styleUrls: ['./alterar-dados.component.css']
})
export class FuncionarioAlterarDadosComponent implements OnInit {

  private usuario: User;
  
  constructor(private routeActivated: ActivatedRoute) { }

  ngOnInit() {
    this.usuario = this.routeActivated.snapshot.data['user'];
  }
}
