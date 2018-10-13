import { Component, OnInit } from '@angular/core';
import { User } from '../../../user/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alterar-dados-usuario',
  templateUrl: './alterar-dados-usuario.component.html',
  styleUrls: ['./alterar-dados-usuario.component.css']
})
export class AlterarDadosUsuarioComponent implements OnInit {

  private usuario: User;
  
  constructor(private routeActivated: ActivatedRoute) { }

  ngOnInit() {
    this.usuario = this.routeActivated.snapshot.data['user'];
  }

}
