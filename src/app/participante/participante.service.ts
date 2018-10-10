import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../account/login/login.service';
import { Participant } from './participante';
import { map } from 'rxjs/operators';


const URL_API = 'http://localhost:51990';

@Injectable({ providedIn: 'root' })
export class ParticipanteService {

    constructor(
        private http: HttpClient,
        private token: LoginService) {
    }

    buscaParticipanteLogado() {
        return this.http.get(URL_API + "/api/aluno/participante-logado/", {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.token.getToken()
            })
        });
    }

    buscaParticipante(id: number) {
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

    cancelSubscribe(idUser: number, idEvent: number) {
        console.log('Usuário: ' + idUser + '| Evento: ' + idEvent);
        // return this.http.post<>
    }

}

export class GerarCertificado {
    UsuarioId: number;
    EventoId: number;
}