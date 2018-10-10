import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RecuperaSenhaDTO, RecuperaSenhaService } from '../email-recuperar-senha/email-recupera-senha.service';
import { User } from '../user';

@Component({
  selector: 'app-recupera-senha',
  templateUrl: './recupera-senha.component.html',
  styleUrls: ['./recupera-senha.component.css']
})
export class RecuperaSenhaComponent implements OnInit {

  private form: FormGroup;
  private erro: string = '';
  private usuario: User;
  private Senha: RecuperaSenhaDTO = new RecuperaSenhaDTO();
  private submit: boolean = false;

  constructor(
    private service: RecuperaSenhaService,
    private activated: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.usuario = this.activated.snapshot.data['user'];

    this.form = new FormGroup({
      NovaSenha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      ConfimarSenha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    this.submit = true;

    if (this.form.invalid)
      return;

    this.Senha.novaSenha = this.form.get('NovaSenha').value;
    this.Senha.confimarSenha = this.form.get('ConfimarSenha').value;

    this.service.recuperarSenha(this.usuario.Id, this.Senha).subscribe(
      () => {
        alert("senha alterada com sucesso."), this.router.navigate(['/login'])
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.showMessage("Usuario não logado");
          this.router.navigate(["/login"])
        }
        else {
          this.showMessage("Não foi possivel resetar senha. Por favor tente novamente");
        }
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
