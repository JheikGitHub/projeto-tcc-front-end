import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';
import { LoginService } from 'src/app/account/login/login.service';

@Component({
  selector: 'app-alterar-foto',
  templateUrl: './alterar-foto.component.html',
  styleUrls: ['./alterar-foto.component.css']
})
export class AlterarFotoComponent implements OnInit {

  form: FormGroup;
  user: User;
  msgAlert: string = null;

  constructor(
    private service: UserService,
    private route: Router,
    private token: LoginService
  ) { }

  ngOnInit() {
    this.service.getUser().subscribe(
      (data) => { this.user = data }
    );

    this.form = new FormGroup({
      'PathFotoPerfil': new FormControl('', [Validators.required])
    })
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('PathFotoPerfil').setValue({
          value: reader.result.toString().split(',')[1]
        })
      }
    }
  }

  onSubmit() {

    var path = this.form.get('PathFotoPerfil').value;
    this.user.PathFotoPerfil = path.value;

    this.service.changePhoto(this.user).subscribe(
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
          alert("Usuario invalido.");
          this.route.navigate(['/login'])
        }
        else
          alert("Falha ao alterar a foto. Por favor tente mais tarde.");
      }
    );
  }
}
