import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Comentario } from './comentario';
import { User } from '../../user/user';
import { LoginService } from '../../account/login/login.service';
import { ForumService } from '../forun.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  private comentarios = []
  topicoDiscusao: string

  comentar: FormGroup
  responder: FormGroup
  comentario: Comentario = { Id: 0, Texto: '', TopicoIDiscucaoId: 0, UsuarioId: 0, ParentId: null }
  comentarioResposta: Comentario

  private user: User;

  constructor(private service: ForumService, private route: ActivatedRoute, private serviceLogin: LoginService) { }

  ngOnInit() {
    this.topicoDiscusao = this.route.snapshot.params['topico-discussao']

    this.getComentariosEventos()

    this.comentar = new FormGroup({
      meuComentario: new FormControl('', [Validators.required, this.noWhitespaceValidator])
    })

    this.responder = new FormGroup({
      minhaResposta: new FormControl('', [Validators.required, this.noWhitespaceValidator])
    })

    this.serviceLogin.getUser().subscribe((usuario: User) => {
      this.user = usuario
    },(err) => { console.log('Usuário não logado') });
    
  }

  onSubmitComment() {
    this.comentario.Texto = this.comentar.controls['meuComentario'].value
    console.log(this.comentario);
  }

  getComentariosEventos() {
    this.service.getAllComentariosTopicoDiscussao(this.topicoDiscusao).subscribe(comentario => {
      this.comentarios = comentario
    })
  }

  responderComentario(comentario) {
    this.comentarioResposta = comentario
    console.log(this.comentarioResposta)
  }

  isModeradorEvento(){
    return false
  }

  private noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

}
