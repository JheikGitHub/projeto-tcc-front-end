import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html'
})
export class AdminMeusDadosComponent implements OnInit {

  private usuario: User;
  constructor(private routeActivated: ActivatedRoute) { }

  ngOnInit() {
    this.usuario = this.routeActivated.snapshot.data['user'];
  }

}