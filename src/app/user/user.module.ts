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
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { CriarUsuarioComponent } from './criar-usuario/criar-usuario.component';
import { DetalhesUsuarioComponent } from './detalhes-usuario/detalhes-usuario.component';
import { GetUserIdResolve } from './get-user-id.resolve';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ErrorsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EmailRecuperarSenhaComponent,
    RecuperaSenhaComponent,
    AlterarSenhaComponent,
    AlterarDadosComponent,
    AlterarFotoComponent,
    ListaUsuariosComponent,
    CriarUsuarioComponent,
    DetalhesUsuarioComponent
  ],
  exports: [
    EmailRecuperarSenhaComponent,
    RecuperaSenhaComponent,
    AlterarSenhaComponent,
    AlterarFotoComponent,
    AlterarDadosComponent,
    ListaUsuariosComponent,
    CriarUsuarioComponent,
    DetalhesUsuarioComponent
  ],
  providers: [
    UserService,
    GetUserResolve,
    GetUserIdResolve,
    RecuperaSenhaService
  ]

})
export class UserModule { }
