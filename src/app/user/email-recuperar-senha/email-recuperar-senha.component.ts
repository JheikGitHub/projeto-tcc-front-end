import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EmailCpf, RecuperaSenhaService } from './email-recupera-senha.service';

@Component({
  selector: 'app-email-recuperar-senha',
  templateUrl: './email-recuperar-senha.component.html',
  styleUrls: ['./email-recuperar-senha.component.css']
})
export class EmailRecuperarSenhaComponent implements OnInit {

  private form: FormGroup;
  private emailCpf: EmailCpf = new EmailCpf();
  private erro: string = '';

  constructor(
    private service: RecuperaSenhaService,
    private formBuild: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuild.group({
      cpf: ['', [Validators.required, Validators.pattern('[0-9]{3}[.|\/]{1}[0-9]{3}[.|\/]{1}[0-9]{3}[-|\/]{1}[0-9]{2}')]]
    })
  }

  onSubmit() {

    if (this.form.invalid) {
      this.erro = '';

      if (this.form.controls['cpf'].status == "INVALID") {

        if (this.form.controls['cpf'].errors.required) {
          this.erro = "O campo Cpf é obrigátorio."
          return;
        }
        else if (this.form.controls['cpf'].errors.pattern) {
          this.erro = "Cpf inválido."
          return;
        }
      }
    }

    this.emailCpf.cpf = this.form.get('cpf').value;

  /*   this.service.email(this.emailCpf).subscribe(
      () => {
        this.showMessage("verifique seu e-mail. Nâo foi possivel alterar senha, Por favor  tente mais tarde.");
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.showMessage("Usuario não logado");
          this.router.navigate(["/login"])
        }
        else {
          this.showMessage("Erro ao tenta enviar o email. Por favor tente novamente");
        }
      }
    ); */
  }


  showMessage(msg: string) {
    this.erro = msg
    setTimeout(() => {
      this.erro = ''
    }, 7000);
  }

}
