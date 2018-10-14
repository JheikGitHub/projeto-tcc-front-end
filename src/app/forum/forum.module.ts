import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicosDiscussaoComponent } from './topicos-discussao/topicos-discussao.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForumService } from './forun.service';
import { RouterModule } from '@angular/router';
import { ComentariosRespostasPipe } from './comentarios/comentarios-respotas.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    ComentariosRespostasPipe,
    TopicosDiscussaoComponent,
    ComentariosComponent
  ],
  providers: [ForumService]
})
export class ForumModule { }
