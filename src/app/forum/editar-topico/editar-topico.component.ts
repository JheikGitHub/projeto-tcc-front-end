import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Evento } from 'src/app/evento/evento';
import { AgendaService } from 'src/app/agenda/agenda.service';
import { ForumService } from '../forun.service';
import { TopicoDiscussao } from '../topicos-discussao/topico-discussao';

@Component({
  selector: 'app-editar-topico',
  templateUrl: './editar-topico.component.html',
  styleUrls: ['./editar-topico.component.css']
})
export class EditarTopicoComponent implements OnInit {

  private form: FormGroup;

  private evento: Evento = new Evento();
  private topico: TopicoDiscussao;
  @Input() nomeEvento: string = '';
  @Input() rota: string = '';


  constructor(
    private activated: ActivatedRoute,
    private serviceAgenda: AgendaService,
    private serviceTopico: ForumService,
    private router: Router,
    private build: FormBuilder) { }

  ngOnInit() {

    this.evento.Nome = this.activated.snapshot.params['nomeEvento'];

    this.topico = this.activated.snapshot.data['nomeTopico'];

    this.serviceAgenda.getEvento(this.evento.Nome).subscribe(
      (data: Evento) => { this.evento = data },
      (err) => {
        console.log(err);
      }
    );
    this.form = this.build.group({
      nome: [this.topico.Nome, [Validators.required, Validators.maxLength(100)]],
      descricao: [this.topico.Descricao, [Validators.required, Validators.maxLength(300)]]
    })
  }

  onSubmit() {

    this.topico.Nome = this.form.get('nome').value;
    this.topico.Descricao = this.form.get('descricao').value;
    this.topico.EventoId = this.evento.Id;

    this.serviceTopico.editarTopico(this.topico).subscribe(
      () => {
        alert("Topico alterado com sucesso.");
        this.router.navigate([this.rota]);
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          alert("Usuario invalido.");
          this.router.navigate(['/login'])
        }
        else
          alert("Falha ao alterar topíco.");
      }
    );
  }

}
