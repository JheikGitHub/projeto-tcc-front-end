import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriarEventoComponent } from './criar-evento/criar-evento.component';
import { AlterarEventoComponent } from './alterar-evento/alterar-evento.component';
import { DetalhesEventoComponent } from './detalhes-evento/detalhes-evento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { ErrorsModule } from '../errors/errors.module';
import { ScriptService } from '../../script.service';
import { BuscaEventoResolve } from './busca-evento.resolve';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ErrorsModule,
    NgxSpinnerModule
  ],
  declarations: [
    CriarEventoComponent,
    AlterarEventoComponent,
    DetalhesEventoComponent
  ],
  exports: [
    DetalhesEventoComponent,
    AlterarEventoComponent,
    CriarEventoComponent
  ],
  providers: [
    BuscaEventoResolve,
    ScriptService
  ]
})
export class EventoModule { }
