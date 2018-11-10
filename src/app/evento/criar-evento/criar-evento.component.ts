import { Component, OnInit, VERSION } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Agenda } from '../../agenda/agenda';
import { Funcionario } from '../../funcionario/funcionario';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { Evento } from '../evento';
import { AgendaService } from '../../agenda/agenda.service';
import { EventoService } from '../evento.service';
import { map } from 'rxjs/operators';
import { EventoVerificacaoNome } from '../evento-verificacao-nome';

declare function showTab(n):any

@Component({
  selector: 'app-criar-evento',
  templateUrl: './criar-evento.component.html',
  styleUrls: ['./criar-evento.component.css']
})
export class CriarEventoComponent implements OnInit {

  form: FormGroup;
  agendas: Agenda[] = [];
  funcionarios: Funcionario[] = [];
  evento: Evento = new Evento();
  eventoVerificacaoNome: EventoVerificacaoNome = new EventoVerificacaoNome()
  private messageErro: string = '';
  private message: string = ''
  fileToUpload: File = null;
  moderadoresEvento: Funcionario[] = [];

  constructor(
    private agendaService: AgendaService,
    private funcionarioService: FuncionarioService,
    private eventoService: EventoService,
    private formBuild: FormBuilder,
    private router: Router) { }


  ngOnInit() {
    this.agendaService.getAllAgendas().subscribe(
      (data: Agenda[]) => {
        this.agendas = data;
        showTab(0)
      },
      (err) => {
        console.log(err);
      }
    );

    this.inicializarFormulario();

    this.funcionarioService.getAll().subscribe(
      (data: Funcionario[]) => {
        this.funcionarios = data
      },
      (err) => {
        console.log(err);
      }
    );

  }

  inicializarFormulario() {
    this.form = this.formBuild.group({
      nome: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9 ]*$'), this.noWhitespaceValidator], [this.validarNomeEvento.bind(this)]],
      local: ['', [Validators.required, Validators.maxLength(100)]],
      diaEvento: ['', [Validators.required]],
      dataInicio: ['', [Validators.required, Validators.pattern('[0-9]{2}[:|\/]{1}[0-9]{2}')]],
      dataEncerramento: ['', [Validators.required, Validators.pattern('[0-9]{2}[:|\/]{1}[0-9]{2}')]],
      descricao: ['', [Validators.required, Validators.maxLength(500), this.noWhitespaceValidator]],
      apresentador: ['', [Validators.required, Validators.maxLength(300)]],
      cargaHoraria: ['', Validators.required],
      quantidadeVagas: ['', Validators.required],
      tipoEvento: ['', [Validators.required, Validators.maxLength(50)]],
      imagem: [null, Validators.required],
      agendaEventoId: ['', [Validators.required]]
    });
  }

  validaCampos() {
    this.messageErro = '';
    if (this.form.get('nome').status == "INVALID") {
      if (this.form.controls['nome'].errors.required) {
        this.messageErro = 'Campo nome é obrigatório.';
        return;
      }
      if (this.form.controls['nome'].errors.maxlength) {
        this.messageErro = 'Campo nome suporta até 100 caracteres.';
        return;
      }
    }

    if (this.form.get('local').status == "INVALID") {
      if (this.form.controls['local'].errors.required) {
        this.messageErro = 'Campo local é obrigatório.';
        return;
      }
      if (this.form.controls['local'].errors.maxlength) {
        this.messageErro = 'Campo local suporta até 100 caracteres.';
        return;
      }
    }

    if (this.form.get('tipoEvento').status == "INVALID") {
      if (this.form.controls['tipoEvento'].errors.required) {
        this.messageErro = 'Campo tipo de evento é obrigatório.';
        return;
      }
      if (this.form.controls['tipoEvento'].errors.maxlength) {
        this.messageErro = 'Campo tipo do evento suporta até 50 caracteres.';
        return;
      }
    }

    if (this.form.get('quantidadeVagas').status == "INVALID") {
      if (this.form.controls['quantidadeVagas'].errors.required) {
        this.messageErro = 'Campo quantidade de vagas é obrigatório.';
        return;
      }
    }

    if (this.form.get('cargaHoraria').status == "INVALID") {
      if (this.form.controls['cargaHoraria'].errors.required) {
        this.messageErro = 'Campo carga horária é obrigatório.';
        return;
      }
    }

    if (this.form.get('apresentador').status == "INVALID") {
      if (this.form.controls['apresentador'].errors.required) {
        this.messageErro = 'Campo apresentador é obrigatório.';
        return;
      }
      if (this.form.controls['apresentador'].errors.maxlength) {
        this.messageErro = 'Campo apresentador suporta até 300 caracteres.';
        return;
      }
    }

    if (this.form.get('descricao').status == "INVALID") {
      if (this.form.controls['descricao'].errors.required) {
        this.messageErro = 'Campo descricao é obrigatório.';
        return;
      }
      if (this.form.controls['descricao'].errors.maxlength) {
        this.messageErro = 'Campo descricao suporta até 500 caracteres.';
        return;
      }
    }

  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.evento.PathImagem = reader.result.toString().split(',')[1]
      }
    }
  }

  preencherDadosEvento() {

    var hrInicio = this.form.get('diaEvento').value + " " + this.form.get('dataInicio').value;
    var hrEncerramento = this.form.get('diaEvento').value + " " + this.form.get('dataEncerramento').value;

    this.evento.Nome = this.form.get('nome').value;
    this.evento.Local = this.form.get('local').value;
    this.evento.DataInicio = hrInicio;
    this.evento.DataEncerramento = hrEncerramento;
    this.evento.Descricao = this.form.get('descricao').value;
    this.evento.Apresentador = this.form.get('apresentador').value;
    this.evento.CargaHoraria = this.form.get('cargaHoraria').value;
    this.evento.NumeroVagas = this.form.get('quantidadeVagas').value;
    this.evento.TipoEvento = this.form.get('tipoEvento').value;
    this.evento.AgendaEventoId = this.form.get('agendaEventoId').value;

    this.evento.funcionario = this.moderadoresEvento
  }

  onSubmit() {

    if (this.form.invalid){
      this.validaCampos();
       return;
   }

    this.preencherDadosEvento();

    this.eventoService.adicionaEvento(this.evento).subscribe(
      () => {
        this.message = 'Evento criado com sucesso'
        setTimeout(() => {
          this.router.navigate(['/funcionario-dashboard/meus-eventos'])
        }, 5000);
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          alert("Usuario não logado");
          this.router.navigate(["/login"])
        }
        else {
          alert("Erro ao tentar cadastrar evento. Por favor tente novamente");
        }
      }
    );

  }

  setModerador(moderador) {
    if (this.moderadoresEvento.indexOf(moderador) > -1)
      this.moderadoresEvento = this.moderadoresEvento.filter(m => m !== moderador)
    else
      this.moderadoresEvento.push(moderador)
  }

  validarNomeEvento(formControl: FormControl) {
    this.eventoVerificacaoNome.NomeEvento = formControl.value
    this.eventoVerificacaoNome.IdAgenda = this.form.get('agendaEventoId').value;

    return this.eventoService.verificarNomeEventoExistente(this.eventoVerificacaoNome).pipe(map(
      nomeExistente => nomeExistente ? { existeEsseNome: true } : null
    ))
  }

  noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

}
