import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ForumModule } from 'src/app/forum/forum.module';
import { EditarTopicoAdminComponent } from './editar-topico-admin/editar-topico-admin.component';
import { CriarTopicoAdminComponent } from './criar-topico-admin/criar-topico-admin.component';
import { ListaTopicosAdminComponent } from './lista-topicos-admin/lista-topicos-admin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ForumModule
  ],
  declarations: [
    EditarTopicoAdminComponent,
    CriarTopicoAdminComponent,
    ListaTopicosAdminComponent
  ]
})
export class ForumAdminModule { }
