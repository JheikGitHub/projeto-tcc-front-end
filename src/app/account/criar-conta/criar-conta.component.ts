import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/user/user';
import { CriarContaService } from './sign-in.service';


@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  private user: User = new User();
  private messageErro: string = '';
  private msgAlert: string = '';
  private form: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private service: CriarContaService,
    private router: Router) { }

  ngOnInit() {
    this.iniciarValoresInput();
  }

  iniciarValoresInput() {
    this.form = this.formBuild.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      dataNascimento: ['', [Validators.required, Validators.required]],
      cpf: ['', [Validators.required,
      Validators.pattern('[0-9]{3}[.|\/]{1}[0-9]{3}[.|\/]{1}[0-9]{3}[-|\/]{1}[0-9]{2}')]],
      genero: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      fotoPerfil: ['']
    });
  }

  validaCampos() {
    this.messageErro = '';

    if (this.form.controls['nome'].status == "INVALID") {
      if (this.form.controls['nome'].errors.required) {
        this.messageErro = "O campo nome é obrigátorio."
        return;
      } else if (this.form.controls['nome'].errors.maxlength) {
        this.messageErro = "O campo nome é permitido até 100 caracteres.."
        return;
      }
    }

    if (this.form.controls['dataNascimento'].status == "INVALID") {
      if (this.form.controls['dataNascimento'].errors.required) {
        this.messageErro = "O campo data de nascimento é obrigátorio."
        return;
      }
      else if (this.form.controls['dataNascimento'].errors.pattern) {
        this.messageErro = "Data de nascimento inválida."
        return;
      }
      return;
    }

    if (this.form.controls['cpf'].status == "INVALID") {
      if (this.form.controls['cpf'].errors.required) {
        this.messageErro = "O campo Cpf é obrigátorio."
        return;
      }
      else if (this.form.controls['cpf'].errors.pattern) {
        this.messageErro = "Cpf inválido."
        return;
      }
      return;
    }

    if (this.form.controls['genero'].status == "INVALID") {
      if (this.form.controls['genero'].errors.required) {
        this.messageErro = "O campo gênero é obrigátorio."
        return;
      }
      return;
    }

    if (this.form.controls['email'].status == "INVALID") {
      if (this.form.controls['email'].errors.required) {
        this.messageErro = "O campo E-mail é obrigátorio."
        return;
      }
      else if (this.form.controls['email'].errors.pattern) {
        this.messageErro = "E-mail inválido."
        return;
      }
      return;
    }

    if (this.form.controls['senha'].status == "INVALID") {
      if (this.form.controls['senha'].errors.required) {
        this.messageErro = "O campo Senha é obrigátorio."
        return;
      }
      else if (this.form.controls['senha'].errors.minlength) {
        this.messageErro = "Senha deve conter no mnímo 6 caracteres."
        return;
      }
      return;
    }
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      console.log(event);

      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('fotoPerfil').setValue({
          value: reader.result.toString().split(',')[1]
        })
      }
    }
  }

  pegaValoresInput() {
    var path = this.form.get('fotoPerfil').value;
    this.user.Nome = this.form.get('nome').value;
    this.user.UserName = this.form.get('email').value;
    this.user.DataNascimento = this.form.get('dataNascimento').value;
    this.user.Cpf = this.form.get('cpf').value;
    this.user.Genero = this.form.get('genero').value;
    this.user.Email = this.form.get('email').value;
    this.user.Senha = this.form.get('senha').value;

    if (path.value != '')
      this.user.PathFotoPerfil = path.value;
    else
      this.user.PathFotoPerfil = '';

    this.user.Perfil = "Aluno";
  }

  onSubmit() {

    if (this.form.invalid) {
      this.validaCampos();
      return;
    }

    this.pegaValoresInput();

    this.service.createAccount(this.user).subscribe(
      (data) => {
        this.showMessage("cadastro realizado com sucesso.")
        this.router.navigate(['/participante-dashboard']);
      },
      (err: HttpErrorResponse) => {
        this.showMessage("Falha ao se registrar, Por favor Tente novamente mais tarde.");
      }
    );
  }

  showMessage(msg: string) {
    this.msgAlert = msg
    setTimeout(() => {
      this.msgAlert = ''
    }, 7000);
  }
}
