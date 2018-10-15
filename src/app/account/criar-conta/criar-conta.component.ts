import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CriarContaService } from './sign-in.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  private user: User = new User();

  private form: FormGroup;
  private submit: boolean = false;
  private erro: string = '';

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
      username: ['', [Validators.required, Validators.maxLength(100)]],
      dataNascimento: ['', [Validators.required, Validators.required, Validators.pattern('[0-9]{2}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{4}')]],
      cpf: ['', [Validators.required,
      Validators.pattern('[0-9]{3}[.|\/]{1}[0-9]{3}[.|\/]{1}[0-9]{3}[-|\/]{1}[0-9]{2}')]],
      genero: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      fotoPerfil: ['']
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
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
    this.user.UserName = this.form.get('username').value;
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
    this.submit = true;

    if (this.form.invalid) {
      return;
    }

    this.pegaValoresInput();

    this.service.createAccount(this.user).subscribe(
      (data) => {
        this.showMessage("cadastro realizado com sucesso.")
        setTimeout(() => {
          this.router.navigate(['/participante-dashboard']);
        }, 5000);
        
      },
      (err: HttpErrorResponse) => {
        this.showMessage("Falha ao se registrar, Por favor Tente novamente mais tarde.");
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
