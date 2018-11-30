import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Agenda } from '../../agenda/agenda';
import { Funcionario } from '../../funcionario/funcionario';
import { ScriptService } from '../../../script.service';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { Evento } from '../evento';
import { EventoService } from '../evento.service';
import { AgendaService } from '../../agenda/agenda.service';
import { EventoVerificacaoNome } from '../evento-verificacao-nome';
import { map } from 'rxjs/operators';
import { User } from 'src/app/user/user';

declare function showTab(n): any
declare function resetCurrentTab(): any

@Component({
  selector: 'app-alterar-evento',
  templateUrl: './alterar-evento.component.html',
  styleUrls: ['./alterar-evento.component.css']
})
export class AlterarEventoComponent implements OnInit {

  private form: FormGroup;
  private agendas: Agenda[] = [];
  private funcionarios: Funcionario[] = [];
  private evento: Evento = new Evento();
  eventoVerificacaoNome: EventoVerificacaoNome = new EventoVerificacaoNome()
  moderadoresEvento: Funcionario[] = [];
  private messageErro: string = '';
  private fileToUpload: File = null;
  imgEvento: string = null


  constructor(
    private script: ScriptService,
    private agendaService: AgendaService,
    private funcionarioService: FuncionarioService,
    private formBuild: FormBuilder,
    private eventoService: EventoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    resetCurrentTab()

    this.agendaService.getAllAgendas().subscribe(
      (data: Agenda[]) => {
        this.agendas = data
        showTab(0)
      },
      (err) => {
        console.log(err);
      }
    );
    this.evento = this.route.snapshot.data['evento'];

    this.atualizaCampos(this.evento);

    this.eventoVerificacaoNome.IdEvento = this.evento.Id
    this.imgEvento = this.evento.PathImagem

    this.funcionarioService.getAll().subscribe(
      (data: Funcionario[]) => {
        this.funcionarios = data
      },
      (err) => {
        console.log(err);
      }
    );

  }

  atualizaCampos(event: Evento) {
    this.form = this.formBuild.group({
      lista: this.funcionarios,
      nome: [event.Nome, [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9 ]*$'), this.noWhitespaceValidator], [this.validarNomeEvento.bind(this)]],
      local: [event.Local, [Validators.required, Validators.maxLength(100)]],
      diaEvento: [event.DataInicio, [Validators.required]],
      dataInicio: [null, [Validators.required]],
      dataEncerramento: [null, [Validators.required]],
      descricao: [event.Descricao, [Validators.required, Validators.maxLength(500)]],
      apresentador: [event.Apresentador, [Validators.required, Validators.maxLength(300)]],
      cargaHoraria: [event.CargaHoraria, Validators.required],
      quantidadeVagas: [event.NumeroVagas, Validators.required],
      tipoEvento: [event.TipoEvento, [Validators.required, Validators.maxLength(50)]],
      imagem: [null],
      agendaEventoId: [event.AgendaEventoId, [Validators.required]]
    });
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
    this.evento.AgendaEventoId = this.form.get('agendaEventoId').value
    this.evento.Funcionario = this.moderadoresEvento
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

  onSubmit() {

    // if (this.form.invalid){
    //   this.validaCampos();
    //   return;
    // }
    
    this.atualizaEvento();
    console.log(this.evento);
    

     this.eventoService.editarEvento(this.evento).subscribe(
       () => { alert("Evento alterado com sucesso."); this.router.navigate(['/funcionario-dashboard']) },
       (err: HttpErrorResponse) => {
         if (err.status == 401) {
           alert("Usuario não logado");
           this.router.navigate(["/login"])
         }
         else {
           alert("Falha ao alterar agenda. Por favor tente novamente");
         }
       }
     );

  }


  setModerador(moderador) {

    if (this.moderadoresEvento.indexOf(moderador) > -1){
      this.moderadoresEvento = this.moderadoresEvento.filter(m => m !== moderador)
      console.log('Removido');
     console.log(this.moderadoresEvento);   

    }    
    else{
      this.moderadoresEvento.push(moderador)
      console.log('Adicionado');
      console.log(this.moderadoresEvento);
    
    }

  }


  isModerador(evento, moderador) {

    let moderadorThisEvent: Boolean = false
    evento.Funcionario.forEach(element => {
      if (element.Id == moderador.Id) {
        moderadorThisEvent = true
        if (this.moderadoresEvento.indexOf(moderador) == -1){
          this.setModerador(moderador)
        }
      }
    });

    return moderadorThisEvent
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    } else {
      return null;
    }
  }

  validarNomeEvento(formControl: FormControl) {
    this.eventoVerificacaoNome.NomeEvento = formControl.value
    if (this.form)
      this.eventoVerificacaoNome.IdAgenda = +this.form.get('agendaEventoId').value;

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
