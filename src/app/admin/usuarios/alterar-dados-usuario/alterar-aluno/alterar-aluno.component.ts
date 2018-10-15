import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-alterar-aluno',
  templateUrl: './alterar-aluno.component.html',
  styleUrls: ['./alterar-aluno.component.css']
})
export class AlterarAlunoComponent implements OnInit {

  @Input() participante: User;
  private formFuncionario: FormGroup;
  private erro: string = '';

  constructor(
    private service: UserService,
    private build: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.iniciarValoresInput();
  }

  iniciarValoresInput() {
    this.formFuncionario = this.build.group({
      nome: [this.participante.Nome, [Validators.required, Validators.maxLength(100)]],
      dataNascimento: [this.participante.DataNascimento, [Validators.required]],
      cpf: [this.participante.Cpf, [Validators.required,
      Validators.pattern('[0-9]{3}[.|\/]{1}[0-9]{3}[.|\/]{1}[0-9]{3}[-|\/]{1}[0-9]{2}')]],
      genero: [this.participante.Genero, Validators.required],
      email: [this.participante.Email, [Validators.required, Validators.email]],
    });
  }

  pegaValoresInput() {

    this.participante.Nome = this.formFuncionario.get('nome').value;
    this.participante.DataNascimento = this.formFuncionario.get('dataNascimento').value;
    this.participante.Cpf = this.formFuncionario.get('cpf').value;
    this.participante.Genero = this.formFuncionario.get('genero').value;
    this.participante = this.formFuncionario.get('matricula').value;
    this.participante.Email = this.formFuncionario.get('email').value;
    this.participante.UserName = this.participante.Email;
  }

  onSubmit() {
    this.pegaValoresInput();

    this.service.setUserChange(this.participante).subscribe(
      (data) => {
        this.showMessage("Aluno alterado com sucesso");
        setTimeout(() => {
          this.router.navigate(['/admin-dashboard/usuarios']);
        }, 5000);

      },
      (err: HttpErrorResponse) => {
        setTimeout(() => {
          this.showMessage("Falha ao se registrar, Por favor Tente novamente mais tarde.");
        }, 5000);
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
