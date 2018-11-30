import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../account/login/login.service';
import { Participant } from './participante';
import { map } from 'rxjs/operators';
import { Subscribe } from '../evento/subscribe';


const URL_API = 'http://localhost:51990';

@Injectable({ providedIn: 'root' })
export class ParticipanteService {

    constructor(
        private http: HttpClient,
        private token: LoginService) {
    }

    alteraParticipante(participante: Participant) {
        return this.http.patch(URL_API + "/api/aluno/altera/" + participante.Id, participante, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    adicioanaParticipante(participante: Participant) {
        return this.http.post(URL_API + "/api/aluno/adiciona-participante", participante);
    }

    buscaParticipanteLogado() {
        return this.http.get(URL_API + "/api/aluno/participante-logado/", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    buscaParticipante(id) {
        return this.http.get<Participant>(URL_API + "/api/aluno/busca-por-id/" + id, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    gerarPdf(geraCertificado: GerarCertificado) {
        return this.http.post(URL_API + "/api/usuario/gerar-certificado", geraCertificado,
            {
                responseType: 'blob',
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + this.token.getToken()
                })
            }).pipe(map(
                (res) => {
                    return new Blob([res], { type: 'application/pdf' })
                }
            ))
    };

    myPresenceEvent(id: number) {
        return this.http.get(URL_API + "/api/usuario/eventos-com-presenca-confirmada/" + id, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        }
        )
    };

    myEscriptionsEvent(id: number) {
        return this.http.get(URL_API + "/api/usuario/eventos-inscrito/" + id, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        }
        )
    };

    cancelSubscribe(subcribe: Subscribe) {
        return this.http.post(URL_API + "/api/usuario/cancelar-inscricao/", subcribe,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + this.token.getToken()
                })
            })
    }

}

export class GerarCertificado {
    UsuarioId: number;
    EventoId: number;
}