import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginService } from '../login/login.service';
import { User } from '../../user/user';

const URL_API = 'http://localhost:51990/api';

@Injectable({
  providedIn: 'root'
})
export class CriarContaService {

  constructor(
    private http: HttpClient,
    private token: LoginService) { }

  createAccount(user: User) {
    return this.http.post(URL_API + "/usuario/adiciona", user);
  }
}