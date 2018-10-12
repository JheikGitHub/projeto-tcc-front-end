import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '../../../user/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../user/user.service';
import { EmailCpf } from '../../../user/email-recuperar-senha/email-recupera-senha.service';
import { ConfirmacaoPresenca, FuncionarioService } from '../../../funcionario/funcionario.service';

@Component({
  selector: 'app-admin-confirma-presenca',
  templateUrl: './confirma-presenca.component.html',
  styleUrls: ['./confirma-presenca.component.css']
})
export class AdminConfirmaPresencaComponent implements OnInit {

  confimaPresenha: ConfirmacaoPresenca = { EventoId: 0, UsuarioId: 0 };
  form: FormGroup;
  mostraTemplate: boolean = false;
  user: User = new User();
  CpfUsuario: EmailCpf = { cpf: '' };

  constructor(private service: UserService,
    private route: ActivatedRoute,
    private serviceFuncionario: FuncionarioService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.confimaPresenha.EventoId = this.route.snapshot.params['id'];
    this.validacaoForm();
  }

  validacaoForm() {
    this.form = new FormGroup({
      cpf: new FormControl('', [Validators.required,
      Validators.pattern('[0-9]{3}[.|\/]{1}[0-9]{3}[.|\/]{1}[0-9]{3}[-|\/]{1}[0-9]{2}')])
    });
  }

  confirmaPresenca(id: number) {
    this.spinner.show();
    this.confimaPresenha.UsuarioId = id;
    this.serviceFuncionario.confirmaPresenca(this.confimaPresenha).subscribe(
      (data) => {
        this.spinner.hide();
        alert('Confirmação realizada com sucesso.')
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401)
          alert("Usuário não logado.");
        else {
          alert("Não foi possivel realiza a confirmaçao de evento. Por favor tente mais tarde")
        }
      }
    );
  }

  cancelarPresenca(id: number) {
    this.spinner.show();
    this.confimaPresenha.UsuarioId = id;
    this.serviceFuncionario.cancelarConfirmaPresenca(this.confimaPresenha).subscribe(
      (data) => { this.spinner.hide(); alert('Cancelada a confirmação no evento.') },
      (err: HttpErrorResponse) => {
        if (err.status == 401)
          alert("Usuário não logado.");
        else {
          alert("Não foi possivel cancelar a confirmaçao de presença no evento. Por favor tente mais tarde")
        }
      }
    );
  }

  onSubmit() {
    this.CpfUsuario.cpf = this.form.get('cpf').value;

    this.service.getUserCpf(this.CpfUsuario).subscribe(
      (data: User) => {
        this.user = data; console.log(data);
        this.mostraTemplate = true;
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401)
          alert("Usuário não logado.");
        else {
          alert("Falha ao alterar agenda. Por favor tente novamente");
        }
      }
    );
  }

}
