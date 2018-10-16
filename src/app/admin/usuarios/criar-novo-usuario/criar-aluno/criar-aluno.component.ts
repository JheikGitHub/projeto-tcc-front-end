import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/user/user';
import { Participant } from 'src/app/participante/participante';
import { ParticipanteService } from 'src/app/participante/participante.service';

@Component({
  selector: 'app-criar-aluno',
  templateUrl: './criar-aluno.component.html',
  styleUrls: ['./criar-aluno.component.css']
})
export class CriarAlunoComponent implements OnInit {

  private formFuncionario: FormGroup;
  private participante: Participant = new Participant();
  private erro: string = '';

  constructor(
    private service: ParticipanteService,
    private build: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.iniciarValoresInput();

  }

  iniciarValoresInput() {
    this.formFuncionario = this.build.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      dataNascimento: ['', [Validators.required, Validators.required]],
      cpf: ['', [Validators.required,
      Validators.pattern('[0-9]{3}[.|\/]{1}[0-9]{3}[.|\/]{1}[0-9]{3}[-|\/]{1}[0-9]{2}')]],
      genero: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      matricula: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      fotoPerfil: ['']
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formFuncionario.get('fotoPerfil').setValue({
          value: reader.result.toString().split(',')[1]
        })
      }
    }
  }

  pegaValoresInput() {
    this.participante.Usuario = new User();

    var path = this.formFuncionario.get('fotoPerfil').value;
    this.participante.Usuario.Nome = this.formFuncionario.get('nome').value;
    this.participante.Usuario.DataNascimento = this.formFuncionario.get('dataNascimento').value;
    this.participante.Usuario.Cpf = this.formFuncionario.get('cpf').value;
    this.participante.Usuario.Genero = this.formFuncionario.get('genero').value;
    this.participante.Matricula = this.formFuncionario.get('matricula').value;
    this.participante.Usuario.Email = this.formFuncionario.get('email').value;
    this.participante.Usuario.UserName = this.participante.Usuario.Email;
    this.participante.Usuario.Senha = this.GeradorSenha();
    this.participante.CodCarteirinha = ("0" + this.formFuncionario.get('matricula').value);

    if (path.value != '')
      this.participante.Usuario.PathFotoPerfil = path.value;
    else
      this.participante.Usuario.PathFotoPerfil = '';

    this.participante.IsAluno = true;
    this.participante.Usuario.Perfil = "Aluno";
  }

  onSubmit() {
    this.pegaValoresInput();

    this.service.adicioanaParticipante(this.participante).subscribe(
      (data) => {
        setTimeout(() => {
          this.showMessage("Aluno cadastrado com sucesso");
        }, 5000);
        this.router.navigate(['/admin-dashboard/usuarios']);
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
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Z', '-', '/', '@', '#', '&'];
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
