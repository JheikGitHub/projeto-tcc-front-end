import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgendaModule } from '../../agenda/agenda.module';

import { FuncionarioMinhasAgendaComponent } from './minhas-agenda.component';
import { FuncionarioCriarAgendaComponent } from './criar-agenda/criar-agenda.component';
import { FuncionarioDetalhesAgendaComponent } from './detalhes-agenda/detalhes-agenda.component';
import { FuncionarioAlterarAgendaComponent } from './alterar-agenda/alterar-agenda.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    AgendaModule,
    RouterModule
  ],
  declarations: [
    FuncionarioMinhasAgendaComponent,
    FuncionarioCriarAgendaComponent,
    FuncionarioDetalhesAgendaComponent,
    FuncionarioAlterarAgendaComponent
  ]
})
export class MinhasAgendaModule { }
