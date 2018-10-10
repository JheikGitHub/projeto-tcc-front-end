import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeParticipanteComponent } from './home-participante/home-participante.component';
import { ParticipanteComponent } from './participante.component';
import { GetUserResolve } from '../user/get-user.resolve';
import { participanteMeusDadosComponent } from './meus-dados/meus-dados.component';
import { ParticipanteAlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { ParticipanteAlterarFotoComponent } from './alterar-foto/alterar-foto.component';
import { ParticipanteAlterarDadosComponent } from './alterar-dados/alterar-dados.component';



const routes: Routes = [
  {
    path: '', component: ParticipanteComponent, resolve: { user: GetUserResolve },
    children: [
      { path: '', component: HomeParticipanteComponent, resolve: { user: GetUserResolve } },
      { path: 'meus-dados', component: participanteMeusDadosComponent },
      { path: 'alterar-senha', component: ParticipanteAlterarSenhaComponent },
      { path: 'alterar-foto', component: ParticipanteAlterarFotoComponent },
      { path: 'alterar-dados', component: ParticipanteAlterarDadosComponent, resolve: { user: GetUserResolve } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipanteRoutingModule { }