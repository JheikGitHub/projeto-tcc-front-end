import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '../../user/user';
import { Evento } from '../../evento/evento';
import { EventoService } from '../../evento/evento.service';
import { CancelamentoEvento } from 'src/app/evento/cancelamento-evento';
import { NgxSpinnerService } from 'ngx-spinner';


import * as jsPDF from 'jspdf'
import 'jspdf-autotable';

import { DomSanitizer } from '@angular/platform-browser';
import { Participant } from 'src/app/participante/participante';

@Component({
  selector: 'app-meus-eventos',
  templateUrl: './meus-eventos.component.html',
  styleUrls: ['./meus-eventos.component.css']
})
export class FuncionarioMeusEventosComponent implements OnInit {
  private eventos: Evento[] = [];
  private user: User;
  inscritos: Participant[] = []
  private eventoCancel: CancelamentoEvento = new CancelamentoEvento()

  nomeEventoSelecionado: string = ''
  imagemEventoSelecionado: string = ''
  idEventoSelecionadao: number
  acaoUsuario: string = ''
  isDelete: boolean = false
  message: string = ''
  msgInfo: string = ''
  pdfBase64: string = ''

  private buscarEventos = new FormControl('');

  constructor(
    private router: Router,
    private eventService: EventoService,
    private sppiner: NgxSpinnerService,
    private routeActivated: ActivatedRoute,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sppiner.show()
    this.user = this.routeActivated.snapshot.data['user'];
    this.getEventosModerador()
  }

  getEventosModerador() {
    this.eventService.getEventsFuncionario(this.user.Id).subscribe(
      (data) => {
        this.eventos = data
        this.sppiner.hide()
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  delete(evento: Evento) {
    this.nomeEventoSelecionado = evento.Nome
    this.imagemEventoSelecionado = evento.PathImagem
    this.idEventoSelecionadao = evento.Id
    this.isDelete = true
    this.acaoUsuario = 'Confirma a exclusão desse evento?'
  }

  confirmDelete() {
    this.eventService.deleteEvento(this.idEventoSelecionadao).subscribe(
      () => {
        this.message = 'Evento excluído com Sucesso'
        this.getEventosModerador()
        setTimeout(() => {
          this.message = ''
        }, 5000);
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          alert("Usuario invalido.");
          this.router.navigate(['/login'])
        }
        else
          alert("Falha ao excluir o evento.");
      })
  }


  cancel(evento: Evento) {
    this.nomeEventoSelecionado = evento.Nome
    this.imagemEventoSelecionado = evento.PathImagem
    this.idEventoSelecionadao = evento.Id
    this.isDelete = false
    this.acaoUsuario = 'Confirma o cancelamento desse evento?'
  }

  confirmCancel() {
    this.eventoCancel.EventoId = this.idEventoSelecionadao
    this.eventoCancel.Descricao = "Ocorreram imprevistos e, infelizmente, tivemos que cancelar o evento. Recomendamos que você busque outros eventos no KONOHA."

    this.eventService.cancelarEvento(this.eventoCancel).subscribe(
      () => {
        this.message = 'Evento cancelado com Sucesso'
        this.getEventosModerador()
        setTimeout(() => {
          this.message = ''
        }, 5000);
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.router.navigate(['/login'])
        }
        else
          alert("Falha ao cancelar o evento.");
      })
  }

  linhas = []
  colunas = [
    { title: "Nome", dataKey: "nome" },
    { title: "CPF", dataKey: "cpf" },
    { title: "Assinatura", dataKey: "assinatura" }
  ];

  gerarListaInscritos(evento) {
    this.eventService.listarInscritosEvento(evento.Id).subscribe((inscrito: Participant[]) => {
      this.inscritos = []
      this.inscritos = inscrito

      if (this.inscritos.length > 0) {
        this.inscritos.forEach(element => {
          this.linhas.push({ "nome": element.Usuario.Nome, "cpf": element.Usuario.Cpf, "assinatura": "" })
          this.gerarTabela(this.colunas, this.linhas, evento.Nome)
        });
        this.linhas = []
      } else {
        this.msgInfo = 'Esse evento ainda não tem nenhum inscrito'
        this.getEventosModerador()
        setTimeout(() => {
          this.msgInfo = ''
        }, 5000);
      }

    })
  }

  gerarTabela(columns, rows, nomeEvento) {
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows, {//Quando roda Funciona
      theme: 'striped',
      columnWidth: 'auto',
      margin: { top: 60 },
      styles: {
        overflow: 'ellipsize',
        columnWidth: 180
      },
      addPageContent: function (data) {
        doc.text("Lista de inscritos no evento: " + nomeEvento, 40, 30);
      }
    });

    this.pdfBase64 = doc.output('datauristring')
  }

}
