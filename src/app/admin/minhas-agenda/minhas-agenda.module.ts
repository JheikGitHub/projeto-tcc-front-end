import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxSpinnerModule } from 'ngx-spinner';
import { AgendaModule } from '../../agenda/agenda.module';

import { AdminMinhasAgendaComponent } from './minhas-agenda.component';
import { AdminAlterarAgendaComponent } from './alterar-agenda/alterar-agenda.component';
import { AdminCriarAgendaComponent } from './criar-agenda/criar-agenda.component';
import { AdminDetalhesAgendaComponent } from './detalhes-agenda/detalhes-agenda.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    AgendaModule,
    RouterModule
  ],
  declarations: [
    AdminMinhasAgendaComponent,
    AdminAlterarAgendaComponent,
    AdminCriarAgendaComponent,
    AdminDetalhesAgendaComponent]
})
export class AdminMinhasAgendaModule { }
