import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Evento } from 'src/app/evento/evento';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendaService } from 'src/app/agenda/agenda.service';
import { TopicoDiscussao } from '../topicos-discussao/topico-discussao';
import { ForumService } from '../forun.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-criar-topico',
  templateUrl: './criar-topico.component.html',
  styleUrls: ['./criar-topico.component.css']
})
export class CriarTopicoComponent implements OnInit {

  private form: FormGroup;

  private evento: Evento = new Evento();

  @Input() nomeEvento: string = '';
  @Input() rota: string = '';

  constructor(
    private activated: ActivatedRoute,
    private serviceAgenda: AgendaService,
    private serviceTopico: ForumService,
    private router: Router) { }

  ngOnInit() {
    this.evento.Nome = this.activated.snapshot.params['nomeEvento'];

    this.serviceAgenda.getEvento(this.evento.Nome).subscribe(
      (data: Evento) => { this.evento = data },
      (err) => {
        console.log(err);
      }
    );

    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      descricao: new FormControl('', [Validators.required, Validators.maxLength(300)])
    })
  }

  onSubmit() {
    let topico: TopicoDiscussao = new TopicoDiscussao();

    topico.Nome = this.form.get('nome').value;
    topico.Descricao = this.form.get('descricao').value;
    topico.EventoId = this.evento.Id;

    this.serviceTopico.adicionarTopico(topico).subscribe(
      () => {
        alert("Topico adicionado com sucesso.");
        this.router.navigate([this.rota]);
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          alert("Usuario invalido.");
          this.router.navigate(['/login'])
        }
        else
          alert("Falha ao criar topíco.");
      }
    );
  }

}
