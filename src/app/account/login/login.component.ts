import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../user/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthenticateDTO, LoginService } from './login.service';

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
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.spinner.show();
    
    this.user.username = this.form.get('username').value;
    this.user.password = this.form.get('password').value;

    this.service.authenticate(this.user).subscribe(
      (data: any) => {
        this.service.setToken(data.access_token);
        this.service.getUser().subscribe(
          (data: User) => {

            this.service.setUser(data.UserName, data.Perfil);

            if (data.Perfil.toLowerCase() == "participante") {
              this.route.navigate(['/participante-dashboard']);
            } else if (data.Perfil.toLowerCase() == "moderador") {
              this.route.navigate(['/funcionario-dashboard'])
            } else {
              this.route.navigate(['/admin-dashboard'])
            }
            this.spinner.hide();
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
        this.showMessage('Acesso negado. Verifique seu Login e SENHA.')
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
