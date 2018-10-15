import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriarFuncionarioComponent } from './criar-funcionario/criar-funcionario.component';
import { CriarNovoUsuarioComponent } from './criar-novo-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorsModule } from 'src/app/errors/errors.module';
import { CriarAdminComponent } from './criar-admin/criar-admin.component';
import { CriarAlunoComponent } from './criar-aluno/criar-aluno.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ErrorsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CriarNovoUsuarioComponent,
    CriarFuncionarioComponent,
    CriarAdminComponent,
    CriarAlunoComponent
  ]
})
export class CriarNovoUsuarioModule { }
