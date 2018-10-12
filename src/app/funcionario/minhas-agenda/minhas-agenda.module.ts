import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioMinhasAgendaComponent } from './minhas-agenda.component';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FuncionarioCriarAgendaComponent } from './criar-agenda/criar-agenda.component';
import { FuncionarioDetalhesAgendaComponent } from './detalhes-agenda/detalhes-agenda.component';
import { FuncionarioAlterarAgendaComponent } from './alterar-agenda/alterar-agenda.component';
import { AgendaModule } from '../../agenda/agenda.module';

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
