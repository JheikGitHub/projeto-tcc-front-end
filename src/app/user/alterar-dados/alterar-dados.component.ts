import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';
import { LoginService } from '../../account/login/login.service';

@Component({
  selector: 'app-alterar-dados',
  templateUrl: './alterar-dados.component.html',
  styleUrls: ['./alterar-dados.component.css']
})
export class AlterarDadosComponent implements OnInit {

  private form: FormGroup;
  private messageErro: string = '';
  @Input() user: User;
  private msgAlert: string = null;


  constructor(
    private formBuild: FormBuilder,
    private serviceUser: UserService,
    private token: LoginService,
    private route: Router) { }

  ngOnInit() {
    this.form = this.formBuild.group({
      Nome: [this.user.Nome, [Validators.required, Validators.maxLength(100)]],
      UserName: [this.user.UserName, [Validators.required, Validators.maxLength(100)]],
      DataNascimento: [this.user.DataNascimento.slice(0, 10), [Validators.required, Validators.pattern('[0-9]{4}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{2}')]],
      Cpf: [this.user.Cpf, [Validators.required, Validators.pattern('[0-9]{3}[.|\/]{1}[0-9]{3}[.|\/]{1}[0-9]{3}[-|\/]{1}[0-9]{2}')]],
      Genero: [this.user.Genero, Validators.required]
    });
  }

  validacaoCampos() {
    this.messageErro = '';

    if (this.form.controls['Nome'].status == "INVALID") {
      if (this.form.controls['Nome'].errors.required) {
        this.messageErro = "O campo nome é obrigátorio."
        return;
      } else if (this.form.controls['Nome'].errors.maxlength) {
        this.messageErro = "O campo nome é permitido até 100 caracteres.."
        return;
      }
    }

    if (this.form.controls['UserName'].status == "INVALID") {
      if (this.form.controls['UserName'].errors.required) {
        this.messageErro = "O campo nome de usuário é obrigátorio."
        return;
      }
      else if (this.form.controls['UserName'].errors.maxlength) {
        this.messageErro = "O campo nome de usuário é permitido até 100 caracteres.."
        return;
      }
      return;
    }

    if (this.form.controls['DataNascimento'].status == "INVALID") {
      if (this.form.controls['DataNascimento'].errors.required) {
        this.messageErro = "O campo data de nascimento é obrigátorio."
        return;
      }
      else if (this.form.controls['DataNascimento'].errors.pattern) {
        this.messageErro = "Data de nascimento inválida."
        return;
      }
      return;
    }

    if (this.form.controls['Cpf'].status == "INVALID") {
      if (this.form.controls['Cpf'].errors.required) {
        this.messageErro = "O campo Cpf é obrigátorio."
        return;
      }
      else if (this.form.controls['Cpf'].errors.pattern) {
        this.messageErro = "Cpf inválido."
        return;
      }
      return;
    }

    if (this.form.controls['Genero'].status == "INVALID") {
      if (this.form.controls['Genero'].errors.required) {
        this.messageErro = "O campo gênero é obrigátorio."
        return;
      }
      return;
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.validacaoCampos();
      return;
    }
    this.user.Nome = this.form.get('Nome').value;
    this.user.Cpf = this.form.get('Cpf').value;
    this.user.DataNascimento = this.form.get('DataNascimento').value;
    this.user.Genero = this.form.get('Genero').value;

    this.serviceUser.setUserChange(this.user).subscribe(
      () => {
        this.msgAlert = 'Salvo com sucesso. Para que as alterações seja concluida e necessario  fazer login!';
        setTimeout(() => {
          this.token.removeToken();
          this.token.removeUser();
          this.route.navigate(['/login'])
        }, 5000);
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          alert("Usuário invalido.");
          this.route.navigate(['/login'])
        }
        else
          alert("Falha ao alterar os dados.");
      }
    );
  }

}
