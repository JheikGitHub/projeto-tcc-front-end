import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioComponent } from './funcionario.component';
import { FuncionarioRoutingModule } from './funcionario.routing';
import { MeusDadosModule } from './meus-dados/meus-dados.module';
import { MeusEventosModule } from './meus-eventos/meus-eventos.module';
import { MinhasAgendaModule } from './minhas-agenda/minhas-agenda.module';
import { HomeFuncionarioComponent } from './home-funcionario/home-funcionario.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MeusEventosModule,
    MinhasAgendaModule,
    MeusDadosModule,
    FuncionarioRoutingModule
  ],
  declarations: [
    HomeFuncionarioComponent,
    FuncionarioComponent
  ],
  providers: [FuncionarioService]
})
export class FuncionarioModule { }
