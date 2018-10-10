import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeParticipanteComponent } from './home-participante/home-participante.component';
import { ParticipanteRoutingModule } from './participante.routing';

@NgModule({
  imports: [
    CommonModule,
    ParticipanteRoutingModule
  ],
  declarations: [HomeParticipanteComponent],
  providers: []
})
export class ParticipanteModule { }
