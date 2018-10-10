import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeParticipanteComponent } from './home-participante/home-participante.component';
import { ParticipanteRoutingModule } from './participante.routing';
import { ParticipanteComponent } from './participante.component';
import { ParticipanteService } from './participante.service';
import { participanteMeusDadosComponent } from './meus-dados/meus-dados.component';
import { ParticipanteAlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { UserModule } from '../user/user.module';
import { ParticipanteAlterarDadosComponent } from './alterar-dados/alterar-dados.component';
import { ParticipanteAlterarFotoComponent } from './alterar-foto/alterar-foto.component';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    ParticipanteRoutingModule
  ],
  declarations: [
    participanteMeusDadosComponent,
    ParticipanteAlterarSenhaComponent,
    ParticipanteComponent,
    HomeParticipanteComponent,
    ParticipanteAlterarDadosComponent,
    ParticipanteAlterarFotoComponent
  ],
  providers: [ParticipanteService]
})
export class ParticipanteModule { }
