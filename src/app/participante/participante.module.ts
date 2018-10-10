import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeParticipanteComponent } from './home-participante/home-participante.component';
import { ParticipanteRoutingModule } from './participante.routing';
import { ParticipanteComponent } from './participante.component';
import { UserModule } from '../user/user.module';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    ParticipanteRoutingModule
  ],
  declarations: [
    ParticipanteComponent,
    HomeParticipanteComponent
  ],
  providers: []
})
export class ParticipanteModule { }
