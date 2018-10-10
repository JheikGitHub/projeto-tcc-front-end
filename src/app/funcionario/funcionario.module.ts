import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeFuncionarioComponent } from './home-funcionario/home-funcionario.component';
import { FuncionarioRoutingModule } from './funcionario.routing';

@NgModule({
  imports: [
    CommonModule,
    FuncionarioRoutingModule
  ],
  declarations: [HomeFuncionarioComponent]
})
export class FuncionarioModule { }
