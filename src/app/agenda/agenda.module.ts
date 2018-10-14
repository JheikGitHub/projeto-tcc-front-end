import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { BuscaAgendaResolve } from './busca-agenda.resolve';
import { CriarAgendaComponent } from './criar-agenda/criar-agenda.component';
import { DetalhesAgendaComponent } from './detalhes-agenda/detalhes-agenda.component';
import { AlterarAgendaComponent } from './alterar-agenda/alterar-agenda.component';
import { ErrorsModule } from '../errors/errors.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgendaComponent } from './agenda/agenda.component';
import { SharedModule } from '../shared/shared.module';
import { FilterEventosAgendaPipe } from './filter.eventos.agenda.pipe';
import { EventoComponent } from './evento/evento.component';
import { ForumModule } from '../forum/forum.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ForumModule,
    ErrorsModule,
    SharedModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
  declarations: [
    CriarAgendaComponent,
    DetalhesAgendaComponent,
    AlterarAgendaComponent,
    AgendaComponent,
    FilterEventosAgendaPipe,
    EventoComponent
  ],
  exports: [
    CriarAgendaComponent,
    DetalhesAgendaComponent,
    AlterarAgendaComponent
  ],
  providers: [BuscaAgendaResolve]
})
export class AgendaModule { }
