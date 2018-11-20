import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/user/user';
import { Funcionario } from 'src/app/funcionario/funcionario';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';

@Component({
  selector: 'app-criar-funcionario',
  templateUrl: './criar-funcionario.component.html',
  styleUrls: ['./criar-funcionario.component.css']
})
export class CriarFuncionarioComponent implements OnInit {

  private formFuncionario: FormGroup;
  private funcionario: Funcionario = new Funcionario();
  private erro: string = '';
  private msgSuccess: string = ''

  constructor(
    private service: FuncionarioService,
    private build: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.iniciarValoresInput();
    this.funcionario.Usuario = new User();
  }

  iniciarValoresInput() {
    this.formFuncionario = this.build.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      dataNascimento: ['', [Validators.required, Validators.required]],
      cpf: ['', [Validators.required,
      Validators.pattern('[0-9]{3}[.|\/]{1}[0-9]{3}[.|\/]{1}[0-9]{3}[-|\/]{1}[0-9]{2}')]],
      genero: ['', Validators.required],
      permissaoCriaAgenda: [false, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fotoPerfil: [null, [Validators.required]]
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.funcionario.Usuario.PathFotoPerfil = reader.result.toString().split(',')[1]
      }
    }
  }

  pegaValoresInput() {
    this.funcionario.Usuario.Nome = this.formFuncionario.get('nome').value;
    this.funcionario.Usuario.DataNascimento = this.formFuncionario.get('dataNascimento').value;
    this.funcionario.Usuario.Cpf = this.formFuncionario.get('cpf').value;
    this.funcionario.Usuario.Genero = this.formFuncionario.get('genero').value;
    this.funcionario.PermissaoCriarAgenda = this.formFuncionario.get('permissaoCriaAgenda').value;
    this.funcionario.Usuario.Email = this.formFuncionario.get('email').value;
    this.funcionario.Usuario.UserName = this.funcionario.Usuario.Email;
    this.funcionario.Usuario.Senha = this.GeradorSenha();

    this.funcionario.IsAdmin = false;
    this.funcionario.Usuario.Perfil = "Funcionario";
  }

  validaCampos() {
    this.erro = '';

    if (this.formFuncionario.controls['nome'].status == "INVALID") {
      if (this.formFuncionario.controls['nome'].errors.required) {
        this.erro = "O campo nome é obrigátorio."
        return;
      } else if (this.formFuncionario.controls['nome'].errors.maxlength) {
        this.erro = "O campo nome é permitido até 100 caracteres.."
        return;
      }
    }

    if (this.formFuncionario.controls['cpf'].status == "INVALID") {
      if (this.formFuncionario.controls['cpf'].errors.required) {
        this.erro = "O campo Cpf é obrigátorio."
        return;
      }
      else if (this.formFuncionario.controls['cpf'].errors.pattern) {
        this.erro = "Cpf inválido."
        return;
      }
      return;
    }
    
    if (this.formFuncionario.controls['dataNascimento'].status == "INVALID") {
      if (this.formFuncionario.controls['dataNascimento'].errors.required) {
        this.erro = "O campo data de nascimento é obrigátorio."
        return;
      }
    }


    if (this.formFuncionario.controls['genero'].status == "INVALID") {
      if (this.formFuncionario.controls['genero'].errors.required) {
        this.erro = "O campo gênero é obrigátorio."
        return;
      }
      return;
    }

    if (this.formFuncionario.controls['permissaoCriaAgenda'].status == "INVALID") {
      if (this.formFuncionario.controls['permissaoCriaAgenda'].errors.required) {
        this.erro = "O campo permissao para criar agenda é obrigátorio."
        return;
      }
      return;
    }

    if (this.formFuncionario.controls['email'].status == "INVALID") {
      if (this.formFuncionario.controls['email'].errors.required) {
        this.erro = "O campo E-mail é obrigátorio."
        return;
      }
      else if (this.formFuncionario.controls['email'].errors.pattern) {
        this.erro = "E-mail inválido."
        return;
      }
      return;
    }
  }
  
  onSubmit() {

    if (this.formFuncionario.invalid) {
      this.validaCampos();
      return;
    }
    
    this.pegaValoresInput();

    this.service.adicionaFuncionario(this.funcionario).subscribe(
      (data) => {
        this.msgSuccess= "Usuário cadastrado com sucesso"
        setTimeout(() => {
          this.router.navigate(['/admin-dashboard/usuarios']);
        }, 7000);
      },
      (err: HttpErrorResponse) => {
        setTimeout(() => {
          this.showMessage("Falha ao se registrar, Por favor Tente novamente mais tarde.");
        }, 5000);
      }
    );
  }

  GeradorSenha() {
    let senha: string = '';
    var letters = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Z'];
    for (let index = 0; index < 6; index++) {
      let resul = letters[Math.floor(Math.random() * letters.length)];
      senha += resul;
    }
    return senha;
  }

  showMessage(msg: string) {
    this.erro = msg
    setTimeout(() => {
      this.erro = ''
    }, 7000);
  }

}
