import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginService } from '../account/login/login.service';
import { Funcionario } from './funcionario';
import { UserConfirmacaoPresenca } from '../user/user-confirmacao-presenca';

const URL_API = 'http://localhost:51990';

@Injectable()
export class FuncionarioService {

    constructor(
        private http: HttpClient,
        private token: LoginService) {
    }

    alteraParticipante(funcionario: Funcionario) {
        return this.http.patch(URL_API + "/api/funcionario/altera/" + funcionario.Usuario.Id, funcionario, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    buscaFuncionario(id) {
        return this.http.get<Funcionario>(URL_API + "/api/funcionario/busca-por-id/" + id, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    adicionaFuncionario(funcionario: Funcionario) {
        return this.http.post(URL_API + "/api/funcionario/adiciona", funcionario, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
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


    getUserConfirmcaoPresenca(dados: DadosConfirmacaoPresenca){
        return this.http.post<UserConfirmacaoPresenca>(URL_API+"/api/usuario/buscar-por-cpf-confirmar-presenca", dados)
    }
    
}

export interface ConfirmacaoPresenca {
    UsuarioId: number;
    EventoId: number;
}

export interface DadosConfirmacaoPresenca{
    CpfUsuario: string
    IdEvento: number
}