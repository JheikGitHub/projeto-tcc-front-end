import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../user/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../user/user.service';
import { ConfirmacaoPresenca, FuncionarioService, DadosConfirmacaoPresenca } from '../../funcionario.service';
import { EmailCpf } from '../../../user/email-recuperar-senha/email-recupera-senha.service';
import { EventoService } from 'src/app/evento/evento.service';
import { Evento } from 'src/app/evento/evento';
import { UserConfirmacaoPresenca } from 'src/app/user/user-confirmacao-presenca';


@Component({
    selector: 'app-confirma-presenca',
    templateUrl: './confirma-presenca.component.html',
    styleUrls: ['./confirma-presenca.component.css']
})
export class FuncionarioConfirmaPresencaComponent implements OnInit {

    confirmarPresenca: ConfirmacaoPresenca = { EventoId: 0, UsuarioId: 0 };
    dados: DadosConfirmacaoPresenca = {IdEvento:0, CpfUsuario: ''}
    form: FormGroup;
    mostraTemplate: boolean = false;
    evento: Evento = new Evento()
    user: UserConfirmacaoPresenca = new UserConfirmacaoPresenca()

    msgSuccess: string = null
    msgError: string = null

    constructor(private service: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private serviceFuncionario: FuncionarioService,
        private spinner: NgxSpinnerService,
        private serviceEvento: EventoService) { }

    ngOnInit(): void {
        this.spinner.show()

        this.confirmarPresenca.EventoId = this.route.snapshot.params['id'];
        this.validacaoForm();

        this.serviceEvento.buscaEventoId(this.route.snapshot.params['id']).subscribe(evento => {
            this.evento = evento
            this.spinner.hide()
        })
    }

    validacaoForm() {
        this.form = new FormGroup({
            cpf: new FormControl('', [Validators.required,
            Validators.pattern('[0-9]{3}[.|\/]{1}[0-9]{3}[.|\/]{1}[0-9]{3}[-|\/]{1}[0-9]{2}'),
            this.cpfValidator])
        });
    }

    confirmaPresenca() {
         this.spinner.show();
         this.confirmarPresenca.UsuarioId = this.user.Usuario.Id;
         this.serviceFuncionario.confirmaPresenca(this.confirmarPresenca).subscribe(
             (data) => {
                 this.spinner.hide();
                 this.msgSuccess = 'Presença do(a) ' + this.user.Usuario.Nome + ' confirmada com sucesso'
                 this.mostraTemplate = false
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

    realizarConfirmacaoPresenca() {
        if (this.form.get('cpf').value.length == 14 && this.form.valid) {
            this.dados.CpfUsuario = this.form.get('cpf').value;
            this.dados.IdEvento = this.confirmarPresenca.EventoId

            this.spinner.show()
            this.serviceFuncionario.getUserConfirmcaoPresenca(this.dados).subscribe(
                (data: UserConfirmacaoPresenca) => {
                    console.log(data);
                    
                    this.user = data
                    this.mostraTemplate = true
                    this.spinner.hide()
                },
                (err: HttpErrorResponse) => {
                    if (err.status == 401){
                        alert("Usuário não logado.");
                        this.spinner.hide
                    }
                    else 
                    if(err.status == 404){
                        this.spinner.hide()
                        this.msgError = "Nenhum participante correspondente ao CPF: " + this.form.get('cpf').value + ' foi encontrado'
                    }
                    else
                    {
                        alert("Usuario nao encontrado");
                        this.spinner.hide()
                    }
                }
            );
        }else{
            this.mostraTemplate = false
        }
    }

    cancelar(){
        this.mostraTemplate = false
    }

    cpfValidator(control: AbstractControl): { [key: string]: boolean } | null {

        let cpf = control.value.replace(/[^\w\s]/gi, '')

        if (cpf == null) {
            return { 'CpfInvalido': true }
        }
        if (cpf.length != 11) {
            return { 'CpfInvalido': true }
        }
        if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
            return { 'CpfInvalido': true }
        }
        let numero: number = 0;
        let caracter: string = '';
        let numeros: string = '0123456789';
        let j: number = 10;
        let somatorio: number = 0;
        let resto: number = 0;
        let digito1: number = 0;
        let digito2: number = 0;
        let cpfAux: string = '';
        cpfAux = cpf.substring(0, 9);
        for (let i: number = 0; i < 9; i++) {
            caracter = cpfAux.charAt(i);
            if (numeros.search(caracter) == -1) {
                return { 'CpfInvalido': true }
            }
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito1 = 11 - resto;
        if (digito1 > 9) {
            digito1 = 0;
        }
        j = 11;
        somatorio = 0;
        cpfAux = cpfAux + digito1;
        for (let i: number = 0; i < 10; i++) {
            caracter = cpfAux.charAt(i);
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito2 = 11 - resto;
        if (digito2 > 9) {
            digito2 = 0;
        }
        cpfAux = cpfAux + digito2;
        if (cpf != cpfAux) {
            return { 'CpfInvalido': true }
        }
        else {
            return null;
        }
    }

    resetMessages(){
        this.msgSuccess = null
        this.msgError = null
    }

}



