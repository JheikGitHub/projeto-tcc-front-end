import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminMeusDadosModule } from './meus-dados/meus-dados.module';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { AdminMeusEventosModule } from './meus-eventos/meus-eventos.module';
import { AdminMinhasAgendaModule } from './minhas-agenda/minhas-agenda.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AdminMeusDadosModule,
    AdminMeusEventosModule,
    AdminMinhasAgendaModule,
    UsuariosModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    HomeAdminComponent
  ],
  providers: [FuncionarioService]
})
export class AdminModule { }
