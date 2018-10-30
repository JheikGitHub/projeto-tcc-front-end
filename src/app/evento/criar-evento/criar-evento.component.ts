import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Agenda } from '../../agenda/agenda';
import { Funcionario } from '../../funcionario/funcionario';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { Evento } from '../evento';
import { AgendaService } from '../../agenda/agenda.service';
import { EventoService } from '../evento.service';
import { ScriptService } from '../../../script.service';

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
  lista: Funcionario[] = [];
  private messageErro: string = '';
  fileToUpload: File = null;

  constructor(
    private script: ScriptService,
    private agendaService: AgendaService,
    private funcionarioService: FuncionarioService,
    private eventoService: EventoService,
    private formBuild: FormBuilder,
    private router: Router) { }


  ngOnInit() {

    this.script.load('konohajs').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));

    this.agendaService.getAllAgendas().subscribe(
      (data: Agenda[]) => {
        this.agendas = data;
      },
      (err) => {
        console.log(err);
      }
    );

    this.atualizaCampos();

    this.funcionarioService.getAll().subscribe(
      (data: Funcionario[]) => {
        this.funcionarios = data
      },
      (err) => {
        console.log(err);
      }
    );
  }

  adicionarFuncionario(funcionario) {
    this.lista.push(funcionario);
  }

  atualizaCampos() {
    this.form = this.formBuild.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      local: ['', [Validators.required, Validators.maxLength(100)]],
      diaEvento: ['', [Validators.required]],
      dataInicio: ['', [Validators.required, Validators.pattern('[0-9]{2}[:|\/]{1}[0-9]{2}')]],
      dataEncerramento: ['', [Validators.required, Validators.pattern('[0-9]{2}[:|\/]{1}[0-9]{2}')]],
      descricao: ['', [Validators.required, Validators.maxLength(500)]],
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
        this.form.get('imagem').setValue({
          value: reader.result.toString().split(',')[1]
        })
      }
    }
  }

  atualizaEvento() {

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
    var path = this.form.get('imagem').value;
    this.evento.PathImagem = path.value;
    this.evento.AgendaEventoId = this.form.get('agendaEventoId').value;
    
    this.evento.funcionario = this.lista;
  }

  onSubmit() {

    if (this.form.invalid){
      this.validaCampos();
      return;
    }

    this.atualizaEvento();

    this.eventoService.adicionaEvento(this.evento).subscribe(
      () => { 
        alert("Evento salvo com sucesso!"); 
        this.router.navigate(['/funcionario-dashboard/meus-eventos']) },
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

}
