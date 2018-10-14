import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicosDiscussaoComponent } from './topicos-discussao/topicos-discussao.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForumService } from './forun.service';
import { RouterModule } from '@angular/router';
import { ComentariosRespostasPipe } from './comentarios/comentarios-respotas.pipe';
import { CriarTopicoComponent } from './criar-topico/criar-topico.component';
import { EditarTopicoComponent } from './editar-topico/editar-topico.component';
import { ForumComponent } from './forum/forum.component';
import { GetTopicoNomeResolve } from './getTopicoResolve';
import { ErrorsModule } from '../errors/errors.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ErrorsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ComentariosRespostasPipe,
    TopicosDiscussaoComponent,
    ComentariosComponent,
    CriarTopicoComponent,
    EditarTopicoComponent,
    ForumComponent
  ],
  exports: [
    ForumComponent,
    CriarTopicoComponent,
    EditarTopicoComponent
  ],
  providers: [ForumService,GetTopicoNomeResolve]
})
export class ForumModule { }
