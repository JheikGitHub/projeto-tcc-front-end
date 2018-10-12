import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserModule } from '../../user/user.module';

import { AdminMeusDadosComponent } from './meus-dados.component';
import { AdminAlterarFotoComponent } from './alterar-foto/alterar-foto.component';
import { AdminAlterarDadosComponent } from './alterar-dados/alterar-dados.component';
import { AdminAlterarSenhaComponent } from './alterar-senha/alterar-senha.component';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    RouterModule
  ],
  declarations: [
    AdminMeusDadosComponent,
    AdminAlterarFotoComponent,
    AdminAlterarDadosComponent,
    AdminAlterarSenhaComponent
  ]
})
export class AdminMeusDadosModule { }
