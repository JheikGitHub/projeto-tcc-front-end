import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AdminRoutingModule } from './admin.routing.module';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminMeusDadosModule } from './meus-dados/meus-dados.module';
import { AdminMeusEventosModule } from './meus-eventos/meus-eventos.module';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { AdminMinhasAgendaModule } from './minhas-agenda/minhas-agenda.module';
import { UsuariosModule } from './usuarios/usuarios.module';

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
  providers:[FuncionarioService]
})
export class AdminModule { }
