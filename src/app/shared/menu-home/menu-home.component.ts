import { Component, OnInit } from '@angular/core';

import { User } from '../../user/user';
import { LoginService } from '../../account/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.css']
})
export class MenuHomeComponent implements OnInit {

  public user: User;

  constructor(
    private service: LoginService,
    private router: Router) { }

  ngOnInit(){
    if (this.service.hasToken()) {
      this.service.getUser().subscribe(
        (usuario: User) => {
          this.user = usuario;
        },
        (err) => { console.log('Usuário não logado')
   });}
  }

  logout() {
    this.service.removeToken();
    this.service.removeUser();
    this.user = null
  }
}
