import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlterarDadosUsuarioComponent } from './alterar-dados-usuario.component';
import { RouterModule } from '@angular/router';
import { AlterarAlunoComponent } from './alterar-aluno/alterar-aluno.component';
import { ErrorsModule } from 'src/app/errors/errors.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlterarFuncionarioComponent } from './alterar-funcionario/alterar-funcionario.component';
import { AlterarAdminComponent } from './alterar-admin/alterar-admin.component';

@NgModule({
  imports: [
    CommonModule,
    ErrorsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    AlterarDadosUsuarioComponent,
    AlterarAlunoComponent,
    AlterarFuncionarioComponent,
    AlterarAdminComponent
  ]
})
export class AlterarDadosUsuarioModule { }
