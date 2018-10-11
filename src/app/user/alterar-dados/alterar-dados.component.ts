import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';
import { LoginService } from '../../account/login/login.service';

@Component({
  selector: 'app-alterar-dados',
  templateUrl: './alterar-dados.component.html',
  styleUrls: ['./alterar-dados.component.css']
})
export class AlterarDadosComponent implements OnInit {

  form: FormGroup;
  user: User = new User();
  msgAlert: string = null;


  constructor(private routerActivated: ActivatedRoute,
    private formBuild: FormBuilder,
    private serviceUser: UserService,
    private token:LoginService,
    private route: Router) { }

  ngOnInit() {
    this.user = this.routerActivated.snapshot.data['user'];
    
    this.form = this.formBuild.group({
      Nome: [this.user.Nome, [Validators.required, Validators.maxLength(100)]],
      UserName: [this.user.UserName, [Validators.required, Validators.maxLength(100)]],
      DataNascimento: [this.user.DataNascimento.slice(0, 10), [Validators.required, Validators.pattern('[0-9]{4}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{2}')]],
      Cpf: [this.user.Cpf, [Validators.required, Validators.pattern('[0-9]{3}[.|\/]{1}[0-9]{3}[.|\/]{1}[0-9]{3}[-|\/]{1}[0-9]{2}')]],
      Genero: [this.user.Genero, Validators.required]
    });
  }
  onSubmit() {
    if (this.form.invalid) {
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
