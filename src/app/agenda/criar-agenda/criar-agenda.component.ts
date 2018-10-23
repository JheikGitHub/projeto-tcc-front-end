import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Agenda } from '../agenda';
import { User } from '../../user/user';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-criar-agenda',
  templateUrl: './criar-agenda.component.html',
  styleUrls: ['./criar-agenda.component.css']
})
export class CriarAgendaComponent implements OnInit {

  private form: FormGroup;
  private user: User;
  private messageErro: string = '';
  private agenda: Agenda = new Agenda();

  constructor(
    private routeActivated: ActivatedRoute,
    private router: Router,
    private AgendaService: AgendaService) { }

  ngOnInit() {
    this.user = this.routeActivated.snapshot.data['user'];

    this.atualizaCampos();
  }

  atualizaCampos() {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      dataInicio: new FormControl('', [Validators.required]),
      dataEncerramento: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      imagem: new FormControl(null, Validators.required)
    })
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

  pegaValorDosInput() {

    this.agenda.Nome = this.form.get('nome').value;
    this.agenda.DataInicio = this.form.get('dataInicio').value
    this.agenda.DateEncerramento = this.form.get('dataEncerramento').value;
    this.agenda.Descricao = this.form.get('descricao').value;

    var path = this.form.get('imagem').value;
    this.agenda.PathImagem = path.value;

    this.agenda.FuncionarioId = this.user.Id;

  }

  onSubmit() {

    if(this.form.invalid){
      this.validaCampos();
      return
    }
    
    this.pegaValorDosInput();

    this.AgendaService.createAgenda(this.agenda).subscribe(
      () => {
        alert("Agenda cadastrada com sucesso");
        this.router.navigate(['/funcionario-dashboard/minhas-agendas']);
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          alert("Usuario não logado.");
          this.router.navigate(["/login"])
        }
        else {
          alert("Falha ao alterar agenda. Por favor tente novamente");
        }
      }
    );

  }
}
