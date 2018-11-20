import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Comentario } from './comentario';
import { User } from '../../user/user';
import { LoginService } from '../../account/login/login.service';
import { ForumService } from '../forun.service';
import { BuscaComentarioTopicoDiscussao } from './buscaComentarioTopicoDiscussao';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  comentarios = []
  topicoDiscusaoId: number
  topicoDiscussao

  comentario: Comentario = new Comentario()
  topico: BuscaComentarioTopicoDiscussao = new BuscaComentarioTopicoDiscussao()

  private user: User;

  comentar: FormGroup
  responder: FormGroup
  comentarioSelecionado: Comentario
  exclusaoComentario: boolean = false
  message: string = null
  messageErro: string = null

  constructor(private service: ForumService, private route: ActivatedRoute, private serviceLogin: LoginService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.topicoDiscusaoId = this.route.snapshot.params['topico-discussao']

    this.getTopicoDiscussao(this.topicoDiscusaoId)

    this.getComentariosTopicoDiscussao()

    this.comentar = new FormGroup({
      meuComentario: new FormControl('', [Validators.required, this.noWhitespaceValidator])
    })

    this.responder = new FormGroup({
      minhaResposta: new FormControl('', [Validators.required, this.noWhitespaceValidator])
    })

    if(this.serviceLogin.hasToken){
      this.serviceLogin.getUser().subscribe((usuario: User) => {
      this.user = usuario
      },(err) => { console.log('Usuário não logado') });
    }
   
    
  }

  onSubmitComment(idCommentResposta: number) {
    this.spinner.show()

    this.comentario.Texto = idCommentResposta ? this.responder.controls['minhaResposta'].value : this.comentar.controls['meuComentario'].value
    this.comentario.ParentId = idCommentResposta ? idCommentResposta : null
    this.comentario.TopicoId = +this.topicoDiscusaoId
    this.comentario.UsuarioId = this.user.Id

    this.service.realizarComentario(this.comentario).subscribe(()=>{
      this.getComentariosTopicoDiscussao()
      this.spinner.hide()
      this.comentar.reset()
      this.responder.reset()
      this.message = "Seu comentário foi postado com sucesso"
      setTimeout(() => {
        this.message = ''
      }, 5000);
    },(err) => { alert('Não foi possível postar seu comentário.'); this.spinner.hide() })

  }

  getComentariosTopicoDiscussao() {
    this.service.getAllComentariosTopicoDiscussao(this.topicoDiscusaoId).subscribe(comentario => {
      this.comentarios = comentario
    }) 
  }

  getTopicoDiscussao(id: number){
    this.service.getTopicoDiscussao(id).subscribe(topico => {
      this.topicoDiscussao = topico
    })
  }

  responderComentario(comentario) {
    this.exclusaoComentario = false
    this.comentarioSelecionado = comentario
  }

  isModeradorEvento(){
    return false
  }

  excluirComentario(comentario){
    this.exclusaoComentario = true
    this.comentarioSelecionado = comentario
  }

  confirmExclusaoComentario(){
    this.spinner.show()
    this.service.deletarComentario(this.comentarioSelecionado.Id).subscribe(()=>{
      this.getComentariosTopicoDiscussao()
      this.spinner.hide()
      this.message = "Comentário excluido com sucesso"
      setTimeout(() => {
        this.message = ''
      }, 5000);
    },(err) => {
      this.messageErro = "Não é possível excluir esse comentário"
      setTimeout(() => {
        this.messageErro = ''
      }, 5000);
      this.spinner.hide() 
    })
  }

  private noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  resetMsg(){
    this.message = null
    this.messageErro = null 
  }

}
