import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { Subscribe } from '../../evento/subscribe';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../../account/login/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Evento } from '../../evento/evento';
import { AgendaService } from '../agenda.service';
import { EventoService } from '../../evento/evento.service';

@Component({
    selector: 'app-evento',
    templateUrl: './evento.component.html',
    styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

    private evento: Evento
    private funcionarios: User[] = [];
    private user: User
    private inscricao: Subscribe = { EventoId: 0, ParticipanteId: 0 }
    idUsuario: number
    idEvento: number
    inscritoNoEvento: boolean
    mensagem: string = ''

    constructor(private service: AgendaService,
        private serviceEvento: EventoService,
        private route: ActivatedRoute,
        private spinner: NgxSpinnerService,
        private serviceLogin: LoginService) { }

    ngOnInit() {
        this.spinner.show();

        this.mostarEvento()
    }

    buscaTodosModeradoresEvento() {
        this.serviceEvento.moderadoresEvento(this.idEvento).subscribe(
            (data: User[]) => { this.funcionarios = data },
            (err) => {
                console.log(err);
            }
        );

    }

    mostarEvento() {
        this.service.getEvento(this.route.snapshot.params['nome-evento']).subscribe((evento: Evento) => {
            this.evento = evento
            this.idEvento = this.evento.Id
            this.buscaTodosModeradoresEvento()
            this.mostarUsuarioLogado()
            this.spinner.hide()
        })
    }

    mostarUsuarioLogado() {
        if (this.serviceLogin.hasToken()) {
            this.serviceLogin.getUser().subscribe((usuario: User) => {
                this.user = usuario
                this.idUsuario = this.user.Id
                this.verificarInscricao()
            }, (err) => { console.log('Usuário não logado') });
        }
    }


    verificarInscricao() {
        let subscribe: Subscribe = { ParticipanteId: this.idUsuario, EventoId: this.idEvento };
        
        this.service.verificarInscricao(subscribe).subscribe(inscricao => {
            this.inscritoNoEvento = inscricao
        })
    }

    realizarInscricao() {
        this.inscricao.EventoId = this.idEvento
        this.inscricao.ParticipanteId = this.idUsuario
        this.service.realizarInscricao(this.inscricao).subscribe(data => {
            this.verificarInscricao()
        }, (error: HttpErrorResponse) => {
            this.mensagem = error.error.Message
            setTimeout(() => {
                this.mensagem = ''
            }, 7000);
        }
        );
    }

    cancelarInscricao() {
        this.inscricao.EventoId = this.idEvento
        this.inscricao.ParticipanteId = this.idUsuario
        this.service.cancelarInscricao(this.inscricao).subscribe(data => {
            this.verificarInscricao()
        }, (error: HttpErrorResponse) => {
            this.mensagem = error.error.Message
            setTimeout(() => {
                this.mensagem = ''
            }, 7000);
        })
    }

}
