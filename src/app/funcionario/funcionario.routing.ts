import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeFuncionarioComponent } from './home-funcionario/home-funcionario.component';
import { FuncionarioComponent } from './funcionario.component';
import { GetUserResolve } from '../user/get-user.resolve';
import { MeusDadosComponent } from './meus-dados/meus-dados.component';
import { FuncionarioAlterarDadosComponent } from './alterar-dados/alterar-dados.component';
import { FuncionarioAlterarFotoComponent } from './alterar-foto/alterar-foto.component';
import { FuncionarioAlterarSenhaComponent } from './alterar-senha/alterar-senha.component';

const routes: Routes = [
  {
    path: '', component: FuncionarioComponent, resolve: { user: GetUserResolve },
    children: [
      { path: '', component: HomeFuncionarioComponent },
      { path: 'meus-dados', component: MeusDadosComponent },
      { path: 'alterar-senha', component: FuncionarioAlterarSenhaComponent },
      { path: 'alterar-foto', component: FuncionarioAlterarFotoComponent },
      { path: 'alterar-dados', component: FuncionarioAlterarDadosComponent, resolve: { user: GetUserResolve } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionarioRoutingModule { }
