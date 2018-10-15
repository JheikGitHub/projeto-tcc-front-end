import { Component, OnInit, Input } from '@angular/core';
import { Funcionario } from 'src/app/funcionario/funcionario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-alterar-funcionario',
  templateUrl: './alterar-funcionario.component.html',
  styleUrls: ['./alterar-funcionario.component.css']
})
export class AlterarFuncionarioComponent implements OnInit {

  @Input() funcionario: User;
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
      nome: [this.funcionario.Nome, [Validators.required, Validators.maxLength(100)]],
      dataNascimento: [this.funcionario.DataNascimento, [Validators.required]],
      cpf: [this.funcionario.Cpf, [Validators.required,
      Validators.pattern('[0-9]{3}[.|\/]{1}[0-9]{3}[.|\/]{1}[0-9]{3}[-|\/]{1}[0-9]{2}')]],
      genero: [this.funcionario.Genero, Validators.required],
      email: [this.funcionario.Email, [Validators.required, Validators.email]]
    });
  }

  pegaValoresInput() {

    this.funcionario.Nome = this.formFuncionario.get('nome').value;
    this.funcionario.DataNascimento = this.formFuncionario.get('dataNascimento').value;
    this.funcionario.Cpf = this.formFuncionario.get('cpf').value;
    this.funcionario.Genero = this.formFuncionario.get('genero').value;
    this.funcionario.Email = this.formFuncionario.get('email').value;
    this.funcionario.UserName = this.funcionario.Email;
  }

  onSubmit() {
    console.log(this.funcionario);

    this.pegaValoresInput();

    this.service.setUserChange(this.funcionario).subscribe(
      (data) => {
        this.showMessage("Funcionario alterado com sucesso");
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
