import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../user/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { GerarCertificado, ParticipanteService } from '../participante.service';
import { Evento } from '../../events/evento';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-meus-certificados',
  templateUrl: './meus-certificados.component.html',
  styleUrls: ['./meus-certificados.component.css']
})
export class MeusCertificadosComponent implements OnInit {

  user: User;
  events: Evento[] = []
  message: string;
  constructor(
    private activated: ActivatedRoute,
    private service: ParticipanteService,
    private route: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.user = this.activated.snapshot.data['user'];
    this.spinner.show();
    this.service.myEscriptionsEvent(this.user.Id).subscribe(
      (data: Evento[]) => { this.events = data, this.spinner.hide() },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          alert("Usuario invalido.");
          this.route.navigate(['/login'])
        }
        else
          alert("Falha ao busca os eventos que foi confirmado a presença. Por favor tente mais tarde.");
      }
    );
  }

  gerarPdf(id: number) {
    let gerarCertificado: GerarCertificado = { UsuarioId: this.user.Id, EventoId: id };
    this.service.gerarPdf(gerarCertificado).subscribe(
      (res) => {
        var fileURL = URL.createObjectURL(res);
        window.open(fileURL),
          (err) => {
            this.message = "Nâo foi possivel gerar certificado";
          }
      })
  }

  downloadPdf(id: number) {
    let gerarCertificado: GerarCertificado = { UsuarioId: this.user.Id, EventoId: id };
    this.service.gerarPdf(gerarCertificado).subscribe(
      (res) => {
        saveAs(res, "certificado.pdf"),
          (err) => {
            this.message = "Nâo foi possivel fazer o download do certificado";
          }
      })
  }

}
