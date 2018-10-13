import { Component, OnInit } from '@angular/core';
import { User } from '../../../user/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-alterar-dados',
  templateUrl: './alterar-dados.component.html',
  styleUrls: ['./alterar-dados.component.css']
})
export class AdminAlterarDadosComponent implements OnInit {

  private usuario: User;
  
  constructor(private routeActivated: ActivatedRoute) { }

  ngOnInit() {
    this.usuario = this.routeActivated.snapshot.data['user'];
  }


}
