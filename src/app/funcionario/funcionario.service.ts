import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginService } from '../account/login/login.service';
import { Funcionario } from './funcionario';

const URL_API = 'http://localhost:51990';

@Injectable()
export class FuncionarioService {

    constructor(
        private http: HttpClient,
        private token: LoginService) {
    }

    getAll() {
        return this.http.get<Funcionario[]>(URL_API + "/api/funcionario/busca-todos", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }
    confirmaPresenca(confirmacaoPresenca: ConfirmacaoPresenca) {
        return this.http.post(URL_API + "/api/evento/confimacao-de-presenca-no-evento", confirmacaoPresenca, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        })
    }

    cancelarConfirmaPresenca(confirmacaoPresenca: ConfirmacaoPresenca) {
        return this.http.post(URL_API + "/api/evento/cancelar-confimacao-de-presenca-no-evento", confirmacaoPresenca, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        })
    }

}

export interface ConfirmacaoPresenca {
    UsuarioId: number;
    EventoId: number;
}