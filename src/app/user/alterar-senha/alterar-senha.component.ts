import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '../user';
import { MudarSenhaDTO, UserService } from '../user.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {

  private form: FormGroup;
  private user: User;
  private messageErro: string = ''
  private senha: MudarSenhaDTO = { ConfimarSenha: '', NovaSenha: '' };
  private msgAlert: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private router: Router) {

  }

  ngOnInit() {

    this.service.getUser().subscribe(
      (data: User) => { this.user = data },
      (err) => {
        console.log(err);
      }
    );

    this.form = new FormGroup({
      'NovaSenha': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'ConfirmarSenha': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    this.messageErro = '';

    if (this.form.invalid) {
      if (this.passwordsEquals(this.form)) {
        this.messageErro = "As senhas não se coincidem";
      }

      if (this.form.controls['NovaSenha'].status == "INVALID") {
        if (this.form.controls['NovaSenha'].errors.required) {
          this.messageErro = "O campo nova senha é obrigátorio."
          return;
        }
      }
      if (this.form.controls['ConfirmarSenha'].status == "INVALID") {
        if (this.form.controls['ConfirmarSenha'].errors.required) {
          this.messageErro = "O campo confirmar senha é obrigátorio."
          return;
        }
      }
      return;
    }

    this.senha.NovaSenha = this.form.controls['NovaSenha'].value;
    this.senha.ConfimarSenha = this.form.controls['ConfirmarSenha'].value;

    this.service.changePassword(this.user.Id, this.senha).subscribe(
      () => {
        this.msgAlert = 'Sua senha foi alterada com sucesso!';
        setTimeout(() => {
          this.router.navigate(['/participante-dashboard/meus-dados'])
        }, 5000);
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          alert("Usuario invalido.");
          this.router.navigate(['/login'])
        }
        else
          alert("Falha ao alterar a senha.");
      }
    );
  }

  private passwordsEquals(f: FormGroup) {
    return f.get('NovaSenha').value === f.get('ConfirmarSenha').value ? false : true;
  }

}
