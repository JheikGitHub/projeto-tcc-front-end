import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../account/login/login.service';
import { User } from '../user/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  usuario: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private token: LoginService) { }

  ngOnInit() {
    this.usuario = this.route.snapshot.data['user']; 
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login'])
  }
}