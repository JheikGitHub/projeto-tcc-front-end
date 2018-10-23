import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-alterar-funcionario',
  templateUrl: './alterar-funcionario.component.html',
  styleUrls: ['./alterar-funcionario.component.css']
})
export class AlterarFuncionarioComponent implements OnInit {

  @Input() funcionario: User;
  private formFuncionario: FormGroup;
  private erro: string = '';

  constructor(
    private service: UserService,
    private build: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.iniciarValoresInput();
  }

  iniciarValoresInput() {
    this.formFuncionario = this.build.group({
      nome: [this.funcionario.Nome, [Validators.required, Validators.maxLength(100)]],
      dataNascimento: [this.funcionario.DataNascimento, [Validators.required]],
      cpf: [this.funcionario.Cpf, [Validators.required,
      Validators.pattern('[0-9]{3}[.|\/]{1}[0-9]{3}[.|\/]{1}[0-9]{3}[-|\/]{1}[0-9]{2}')]],
      genero: [this.funcionario.Genero, Validators.required],
      email: [this.funcionario.Email, [Validators.required, Validators.email]]
    });
  }

  pegaValoresInput() {

    this.funcionario.Nome = this.formFuncionario.get('nome').value;
    this.funcionario.DataNascimento = this.formFuncionario.get('dataNascimento').value;
    this.funcionario.Cpf = this.formFuncionario.get('cpf').value;
    this.funcionario.Genero = this.formFuncionario.get('genero').value;
    this.funcionario.Email = this.formFuncionario.get('email').value;
    this.funcionario.UserName = this.funcionario.Email;
  }

  validaCampos() {
    this.erro = '';

    if (this.formFuncionario.controls['nome'].status == "INVALID") {
      if (this.formFuncionario.controls['nome'].errors.required) {
        this.erro = "O campo nome é obrigátorio."
        return;
      } else if (this.formFuncionario.controls['nome'].errors.maxlength) {
        this.erro = "O campo nome é permitido até 100 caracteres.."
        return;
      }
    }

    if (this.formFuncionario.controls['cpf'].status == "INVALID") {
      if (this.formFuncionario.controls['cpf'].errors.required) {
        this.erro = "O campo Cpf é obrigátorio."
        return;
      }
      else if (this.formFuncionario.controls['cpf'].errors.pattern) {
        this.erro = "Cpf inválido."
        return;
      }
      return;
    }

    if (this.formFuncionario.controls['dataNascimento'].status == "INVALID") {
      if (this.formFuncionario.controls['dataNascimento'].errors.required) {
        this.erro = "O campo data de nascimento é obrigátorio."
        return;
      }
    }

    if (this.formFuncionario.controls['genero'].status == "INVALID") {
      if (this.formFuncionario.controls['genero'].errors.required) {
        this.erro = "O campo gênero é obrigátorio."
        return;
      }
      return;
    }

    if (this.formFuncionario.controls['permissaoCriaAgenda'].status == "INVALID") {
      if (this.formFuncionario.controls['permissaoCriaAgenda'].errors.required) {
        this.erro = "O campo permissao para criar agenda é obrigátorio."
        return;
      }
      return;
    }

    if (this.formFuncionario.controls['email'].status == "INVALID") {
      if (this.formFuncionario.controls['email'].errors.required) {
        this.erro = "O campo E-mail é obrigátorio."
        return;
      }
      else if (this.formFuncionario.controls['email'].errors.pattern) {
        this.erro = "E-mail inválido."
        return;
      }
      return;
    }
  }
  
  onSubmit() {

    if (this.formFuncionario.invalid) {
      this.validaCampos();
      return;
    }

    this.pegaValoresInput();

    this.service.setUserChange(this.funcionario).subscribe(
      (data) => {
        setTimeout(() => {
          this.showMessage("Funcionario alterado com sucesso");
        }, 5000);
        this.router.navigate(['/admin-dashboard/usuarios']);
      },
      (err: HttpErrorResponse) => {
        setTimeout(() => {
          this.showMessage("Falha ao se registrar, Por favor Tente novamente mais tarde.");
        }, 5000);
      }
    );
  }

  showMessage(msg: string) {
    this.erro = msg
    setTimeout(() => {
      this.erro = ''
    }, 7000);
  }



}
