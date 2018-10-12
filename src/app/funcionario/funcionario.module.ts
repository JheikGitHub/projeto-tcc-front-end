import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeFuncionarioComponent } from './home-funcionario/home-funcionario.component';
import { FuncionarioRoutingModule } from './funcionario.routing';
import { FuncionarioComponent } from './funcionario.component';
import { FuncionarioService } from './funcionario.service';
import { MeusEventosModule } from './meus-eventos/meus-eventos.module';
import { MeusDadosModule } from './meus-dados/meus-dados.module';
import { MinhasAgendaModule } from './minhas-agenda/minhas-agenda.module';

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
