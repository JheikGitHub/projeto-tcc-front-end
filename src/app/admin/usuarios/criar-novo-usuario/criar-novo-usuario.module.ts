import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriarFuncionarioComponent } from './criar-funcionario/criar-funcionario.component';
import { CriarNovoUsuarioComponent } from './criar-novo-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorsModule } from 'src/app/errors/errors.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ErrorsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CriarNovoUsuarioComponent,
    CriarFuncionarioComponent
  ]
})
export class CriarNovoUsuarioModule { }
