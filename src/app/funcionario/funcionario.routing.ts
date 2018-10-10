import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeFuncionarioComponent } from './home-funcionario/home-funcionario.component';

const routes: Routes = [
  { path: '', component: HomeFuncionarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionarioRoutingModule { }
