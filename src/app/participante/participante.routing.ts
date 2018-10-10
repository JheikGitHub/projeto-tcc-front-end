import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeParticipanteComponent } from './home-participante/home-participante.component';
import { ParticipanteComponent } from './participante.component';
import { GetUserResolve } from '../user/get-user.resolve';


const routes: Routes = [
  {
    path: '', component: ParticipanteComponent, resolve: { user: GetUserResolve },
    children: [
      { path: '', component: HomeParticipanteComponent, resolve: { user: GetUserResolve } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipanteRoutingModule { }
