import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user/user';


@Component({
  selector: 'app-alterar-dados-usuario',
  templateUrl: './alterar-dados-usuario.component.html',
  styleUrls: ['./alterar-dados-usuario.component.css']
})
export class AlterarDadosUsuarioComponent implements OnInit {

  private usuario: User;

  constructor(
    private routeActivated: ActivatedRoute) { }

  ngOnInit() {
    this.usuario = this.routeActivated.snapshot.data['user'];

  }

}
