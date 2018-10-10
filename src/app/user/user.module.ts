import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmailRecuperarSenhaComponent } from './email-recuperar-senha/email-recuperar-senha.component';
import { ErrorsModule } from '../errors/errors.module';
import { RecuperaSenhaService } from './email-recuperar-senha/email-recupera-senha.service';
import { RecuperaSenhaComponent } from './recupera-senha/recupera-senha.component';
import { RouterModule } from '@angular/router';
import { UserService } from './user.service';
import { GetUserResolve } from './get-user.resolve';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { AlterarDadosComponent } from './alterar-dados/alterar-dados.component';
import { AlterarFotoComponent } from './alterar-foto/alterar-foto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ErrorsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EmailRecuperarSenhaComponent,
    RecuperaSenhaComponent,
    AlterarSenhaComponent,
    AlterarDadosComponent,
    AlterarFotoComponent
  ],
  exports: [
    EmailRecuperarSenhaComponent,
    RecuperaSenhaComponent,
    AlterarSenhaComponent,
    AlterarFotoComponent,
    AlterarDadosComponent
  ],
  providers: [
    UserService,
    GetUserResolve,
    RecuperaSenhaService
  ]

})
export class UserModule { }
