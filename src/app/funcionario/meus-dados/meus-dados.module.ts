import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserModule } from '../../user/user.module';

import { FuncionarioAlterarFotoComponent } from './alterar-foto/alterar-foto.component';
import { FuncionarioAlterarDadosComponent } from './alterar-dados/alterar-dados.component';
import { FuncionarioAlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { FuncionarioMeusDadosComponent } from './meus-dados.component';
import { ForumModule } from 'src/app/forum/forum.module';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    ForumModule,
    RouterModule
  ],
  declarations: [
    FuncionarioMeusDadosComponent,
    FuncionarioAlterarFotoComponent,
    FuncionarioAlterarDadosComponent,
    FuncionarioAlterarSenhaComponent
  ]
})
export class MeusDadosModule { }
