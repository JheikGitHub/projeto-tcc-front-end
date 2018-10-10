import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from '../account/login/login.service';
import { User } from '../user/user';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html'
})
export class ParticipanteComponent implements OnInit {

  user: User;

  constructor(
    private activated: ActivatedRoute,
     private tokem: LoginService,
     private router:Router) { }

  ngOnInit() {
    this.user = this.activated.snapshot.data['user'];

  }

  logout() {
    this.tokem.removeToken();
    this.tokem.removeUser();
    this.router.navigate(['/login'])
  }
}
