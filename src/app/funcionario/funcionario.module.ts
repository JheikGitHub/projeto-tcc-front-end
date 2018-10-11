import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeFuncionarioComponent } from './home-funcionario/home-funcionario.component';
import { FuncionarioRoutingModule } from './funcionario.routing';
import { FuncionarioComponent } from './funcionario.component';
import { MeusDadosComponent } from './meus-dados/meus-dados.component';
import { FuncionarioAlterarFotoComponent } from './alterar-foto/alterar-foto.component';
import { FuncionarioAlterarDadosComponent } from './alterar-dados/alterar-dados.component';
import { FuncionarioAlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { UserModule } from '../user/user.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    UserModule,
    FuncionarioRoutingModule
  ],
  declarations: [
    HomeFuncionarioComponent,
    FuncionarioComponent,
    MeusDadosComponent,
    FuncionarioAlterarFotoComponent,
    FuncionarioAlterarDadosComponent,
    FuncionarioAlterarSenhaComponent
  ]
})
export class FuncionarioModule { }
