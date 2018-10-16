import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ForumModule } from '../forum/forum.module';
import { ErrorsModule } from '../errors/errors.module';
import { SharedModule } from '../shared/shared.module';
import { FilterAgendaPipe } from './filter.agenda.pipe';
import { AgendaComponent } from './agenda/agenda.component';
import { BuscaAgendaResolve } from './busca-agenda.resolve';
import { EventoComponent } from './evento/evento.component';
import { FilterEventosAgendaPipe } from './filter.eventos.agenda.pipe';
import { CriarAgendaComponent } from './criar-agenda/criar-agenda.component';
import { AlterarAgendaComponent } from './alterar-agenda/alterar-agenda.component';
import { DetalhesAgendaComponent } from './detalhes-agenda/detalhes-agenda.component';

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
    FilterAgendaPipe,
    EventoComponent
  ],
  exports: [
    FilterAgendaPipe,
    FilterEventosAgendaPipe,
    CriarAgendaComponent,
    DetalhesAgendaComponent,
    AlterarAgendaComponent
  ],
  providers: [BuscaAgendaResolve]
})
export class AgendaModule { }
