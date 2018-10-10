import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserAuthenticateDTO, LoginService } from './login.service';
import { User } from '../../user/user';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: UserAuthenticateDTO = new UserAuthenticateDTO();
  private erro: string;
  private form: FormGroup;

  constructor(private formsBuild: FormBuilder,
    private service: LoginService,
    private route: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.form = this.formsBuild.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.user.username = this.form.get('username').value;
    this.user.password = this.form.get('password').value;
    this.spinner.show();

    this.service.authenticate(this.user).subscribe(
      (data: any) => {
        this.service.setToken(data.access_token);
        this.service.getUser().subscribe(
          (data: User) => {

            this.service.setUser(data.UserName, data.Perfil);
            this.spinner.hide();

            if (data.Perfil.toLowerCase() == "aluno") {
              this.route.navigate(['/participante-dashboard']);
            } else if (data.Perfil.toLowerCase() == "funcionario") {
              this.route.navigate(['/funcionario-dashboard'])
            } else {
              this.route.navigate(['/admin-dashboard'])
            }
          },
          async (err: HttpErrorResponse) => {
            this.spinner.hide();
            if (err.status == 401)
              this.showMessage('Acesso negado. Verifique seu LOGIN e SENHA.')
            else {
              this.showMessage('Falha ao relizar Login. Tente novamente.')
            }
          }
        );
      },
      async (err: HttpErrorResponse) => {
        this.spinner.hide();
          this.showMessage('Acesso negado. Verifique seu USERNAME e SENHA.')
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
