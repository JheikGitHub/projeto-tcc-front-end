import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { LoginService } from '../account/login/login.service';
import { User } from './user';


const URL_API = 'http://localhost:51990';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private http: HttpClient,
        private token: LoginService
    ) { }

    buscaUsuario(id) {
        return this.http.get<User>(URL_API + "/api/usuario/busca-por-id/" + id, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    excluiUsuario(idUsuario) {
        return this.http.delete(URL_API + "/api/usuario/remove/" + idUsuario,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + this.token.getToken()
                })
            });
    }

    getUserCpf(cpf: EmailCpf) {
        return this.http.post(URL_API + "/api/usuario/busca-por-cpf", cpf,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + this.token.getToken()
                })
            });
    }

    getUser() {
        return this.http.get<User>(URL_API + "/api/usuario/acess-user", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    getAllUser(pageIndex, pageSize) {

        var paransIndex = new HttpParams().append('pageIndex', pageSize.toString()).append('pageSize', pageIndex.toString())

        return this.http.get<User[]>(URL_API + "/api/usuario/busca-todos", {
            params: paransIndex,
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    setUserChange(user: User) {
        return this.http.put(URL_API + "/api/usuario/altera/" + user.Id, user, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    changePhoto(user: User) {
        return this.http.patch(URL_API + "/api/usuario/alterar-foto/", user, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    changePassword(id: number, senha: MudarSenhaDTO) {
        return this.http.put(URL_API + "/api/usuario/recupera-senha/" + id, senha, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }
}


export interface MudarSenhaDTO {
    NovaSenha: string;
    ConfimarSenha: string;
}

export class EmailCpf {
    cpf: string
}