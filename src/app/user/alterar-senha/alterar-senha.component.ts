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

  form: FormGroup;
  submit: boolean = false;
  user: User;
  senha: MudarSenhaDTO = { ConfimarSenha: '', NovaSenha: '' };
  msgAlert: string = null;

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
    }, this.passwordsEquals);
  }

  onSubmit() {
    this.submit = true;

    if (this.form.invalid) {
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
    return f.get('NovaSenha').value === f.get('ConfirmarSenha').value ? null : { 'mismatch': true };
  }

}
