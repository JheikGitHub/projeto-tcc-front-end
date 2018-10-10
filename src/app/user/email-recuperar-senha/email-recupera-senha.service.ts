import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginService } from '../../account/login/login.service';

const URL_API = 'http://localhost:51990/api';

@Injectable({ providedIn: 'root' })
export class RecuperaSenhaService {

    constructor(private httpClient: HttpClient, private token: LoginService) { }

    email(cpf: EmailCpf) {
        return this.httpClient.post(URL_API + "/usuario/email", cpf, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    recuperarSenha(idUsuario: number, senha: RecuperaSenhaDTO) {
        return this.httpClient.put(URL_API + "/usuario/recupera-senha/" + idUsuario, senha,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }
}





export class RecuperaSenhaDTO {
    novaSenha: string;
    confimarSenha: string;
}

export class EmailCpf {
    cpf: string
}