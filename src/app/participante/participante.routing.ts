import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetUserResolve } from '../user/get-user.resolve';
import { ParticipanteComponent } from './participante.component';
import { participanteMeusDadosComponent } from './meus-dados/meus-dados.component';
import { ParticipanteAlterarFotoComponent } from './alterar-foto/alterar-foto.component';
import { ParticipanteAlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { ParticipanteAlterarDadosComponent } from './alterar-dados/alterar-dados.component';
import { MinhasInscricoesComponent } from './minhas-inscricoes/minhas-inscricoes.component';
import { MeusCertificadosComponent } from './meus-certificados/meus-certificados.component';
import { HomeParticipanteComponent } from './home-participante/home-participante.component';
import { ParticipanteDetalhesEventoComponent } from './detalhes-evento/detalhes-evento.component';

const routes: Routes = [
  {
    path: '', component: ParticipanteComponent, resolve: { user: GetUserResolve },
    children: [
      { path: '', component: HomeParticipanteComponent, resolve: { user: GetUserResolve } },
      { path: 'meus-dados', component: participanteMeusDadosComponent },
      { path: 'minhas-inscricoes', component: MinhasInscricoesComponent, resolve: { user: GetUserResolve } },
      { path: 'meus-certificados', component: MeusCertificadosComponent, resolve: { user: GetUserResolve } },
      { path: 'alterar-senha', component: ParticipanteAlterarSenhaComponent },
      { path: 'alterar-foto', component: ParticipanteAlterarFotoComponent },
      { path: 'alterar-dados', component: ParticipanteAlterarDadosComponent, resolve: { user: GetUserResolve } },
      { path: 'minhas-inscricoes/detalhes-evento/:id', component: ParticipanteDetalhesEventoComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipanteRoutingModule { }
