import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/user/user';
import { CriarContaService } from './sign-in.service';
import { LoginService, UserAuthenticateDTO } from '../login/login.service';
import { bind } from '@angular/core/src/render3/instructions';
import { Participant } from 'src/app/participante/participante';
import { ParticipanteService } from 'src/app/participante/participante.service';


@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  private user: Participant = new Participant();
  private user2: UserAuthenticateDTO = new UserAuthenticateDTO();
  private messageErro: string = '';
  private msgAlert: string = '';
  private form: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private service: CriarContaService,
    private serviceLogin: LoginService,
    private participanteService: ParticipanteService,
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
      login: ['', [Validators.required, Validators.minLength(6)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      fotoPerfil: [null, [Validators.required]]
    }, this.passwordsEquals);
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
    this.user.Usuario = new User()

    var path = this.form.get('fotoPerfil').value;
    this.user.Usuario.Nome = this.form.get('nome').value;
    this.user.Usuario.UserName = this.form.get('login').value;
    this.user.Usuario.DataNascimento = this.form.get('dataNascimento').value;
    this.user.Usuario.Cpf = this.form.get('cpf').value;
    this.user.Usuario.Genero = this.form.get('genero').value;
    this.user.Usuario.Email = this.form.get('email').value;
    this.user.Usuario.Senha = this.form.get('senha').value;
    
    this.user.Matricula = ("0"+this.form.get('cpf').value);
    this.user.CodCarteirinha = ("0"+this.form.get('cpf').value);

    if (path.value != '')
      this.user.Usuario.PathFotoPerfil = path.value;
    else
      this.user.Usuario.PathFotoPerfil = '';

    this.user.IsAluno = false;
    this.user.Usuario.Perfil = "Participante";
  }

  onSubmit() {

    if (this.form.invalid) {
      this.validaCampos();
      return;
    }

    this.pegaValoresInput();

    this.participanteService.adicioanaParticipante(this.user).subscribe(
      (data) => {
        this.showMessage("cadastro realizado com sucesso.")
        this.user2.username = this.user.Usuario.UserName
        this.user2.password = this.user.Usuario.Senha

        this.serviceLogin.authenticate(this.user2).subscribe((data: any) => {
            this.serviceLogin.setToken(data.access_token);
           
            this.serviceLogin.getUser().subscribe(
              (data: User) => {
                this.serviceLogin.setUser(data.UserName, data.Perfil);
                  this.router.navigate(['/participante-dashboard'])
            })
        })   

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

  private passwordsEquals(f: FormGroup) {
    return f.get('NovaSenha').value === f.get('ConfirmarSenha').value ? false : true;
  }
}
