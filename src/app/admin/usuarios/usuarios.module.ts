import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsuariosComponent } from './usuarios.component';
import { RouterModule } from '@angular/router';
import { UserModule } from '../../user/user.module';
import { DetalhesDadosUsuarioComponent } from './detalhes-dados-usuario/detalhes-dados-usuario.component';
import { AlterarDadosUsuarioComponent } from './alterar-dados-usuario/alterar-dados-usuario.component';
import { CriarNovoUsuarioModule } from './criar-novo-usuario/criar-novo-usuario.module';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    CriarNovoUsuarioModule,
    RouterModule
  ],
  declarations: [
    AdminUsuariosComponent,
    DetalhesDadosUsuarioComponent,
    AlterarDadosUsuarioComponent,

  ]
})
export class UsuariosModule { }
