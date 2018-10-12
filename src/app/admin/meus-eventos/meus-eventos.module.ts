import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorsModule } from '../../errors/errors.module';
import { EventoModule } from '../../evento/evento.module';

import { AdminAlterarEventoComponent } from './alterar-evento/alterar-evento.component';
import { AdminConfirmaPresencaComponent } from './confirma-presenca/confirma-presenca.component';
import { AdminCriarEventoComponent } from './criar-evento/criar-evento.component';
import { AdminDetalhesEventoComponent } from './detalhes-evento/detalhes-evento.component';
import { AdminMeusEventosComponent } from './meus-eventos.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ErrorsModule,
    EventoModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminMeusEventosComponent,
    AdminAlterarEventoComponent,
    AdminConfirmaPresencaComponent,
    AdminCriarEventoComponent,
    AdminDetalhesEventoComponent
  ]
})
export class AdminMeusEventosModule { }
