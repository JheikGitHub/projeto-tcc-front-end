import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarTopicoFuncionarioComponent } from './editar-topico-funcionario/editar-topico-funcionario.component';
import { CriarTopicoFuncionarioComponent } from './criar-topico-funcionario/criar-topico-funcionario.component';
import { ListaTopicosFuncionarioComponent } from './lista-topicos-funcionario/lista-topicos-funcionario.component';
import { RouterModule } from '@angular/router';
import { ForumModule } from 'src/app/forum/forum.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ForumModule
  ],
  declarations: [
    EditarTopicoFuncionarioComponent,
    CriarTopicoFuncionarioComponent,
    ListaTopicosFuncionarioComponent
  ]
})
export class ForumFuncionarioModule { }
