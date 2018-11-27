import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorsModule } from '../../errors/errors.module';
import { EventoModule } from '../../evento/evento.module';
import { FuncionarioConfirmaPresencaComponent } from './confirma-presenca/confirma-presenca.component';
import { FuncionarioDetalhesEventoComponent } from './detalhes-evento/detalhes-evento.component';
import { FuncionarioAlterarEventoComponent } from './alterar-evento/alterar-evento.component';
import { FuncionarioCriarEventoComponent } from './criar-evento/criar-evento.component';
import { FuncionarioMeusEventosComponent } from './meus-eventos.component';
import { AgendaModule } from 'src/app/agenda/agenda.module';
import { ForumFuncionarioModule } from '../forum-funcionario/forum-funcionario.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ErrorsModule,
    EventoModule,
    ForumFuncionarioModule,
    AgendaModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  declarations: [
    FuncionarioMeusEventosComponent,
    FuncionarioConfirmaPresencaComponent,
    FuncionarioDetalhesEventoComponent,
    FuncionarioAlterarEventoComponent,
    FuncionarioCriarEventoComponent
  ]
})
export class MeusEventosModule { }
