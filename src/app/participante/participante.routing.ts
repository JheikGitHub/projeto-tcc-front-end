import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeParticipanteComponent } from './home-participante/home-participante.component';


const routes: Routes = [
  { path: '', component: HomeParticipanteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipanteRoutingModule { }
