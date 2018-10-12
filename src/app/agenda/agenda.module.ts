import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BuscaAgendaResolve } from './busca-agenda.resolve';
import { CriarAgendaComponent } from './criar-agenda/criar-agenda.component';
import { DetalhesAgendaComponent } from './detalhes-agenda/detalhes-agenda.component';
import { AlterarAgendaComponent } from './alterar-agenda/alterar-agenda.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorsModule } from '../errors/errors.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ErrorsModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
  declarations: [
    CriarAgendaComponent,
    DetalhesAgendaComponent,
    AlterarAgendaComponent
  ],
  exports:[
    CriarAgendaComponent,
    DetalhesAgendaComponent,
    AlterarAgendaComponent
  ],
  providers: [BuscaAgendaResolve]
})
export class AgendaModule { }
