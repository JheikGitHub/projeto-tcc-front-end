import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ForumService } from 'src/app/forum/forun.service';
import { TopicoDiscussao } from 'src/app/forum/topicos-discussao/topico-discussao';

@Component({
  selector: 'app-lista-topicos-funcionario',
  templateUrl: './lista-topicos-funcionario.component.html',
  styleUrls: ['./lista-topicos-funcionario.component.css']
})
export class ListaTopicosFuncionarioComponent implements OnInit {

  private nomeEvento: string;
  private topicosDiscussao: TopicoDiscussao[] = []

  constructor(private activated: ActivatedRoute, private service: ForumService) { }

  ngOnInit() {
    this.nomeEvento = this.activated.snapshot.params['nomeEvento'];
  
    this.service.getAllTopicosDiscussao(this.nomeEvento).subscribe(topicoDiscussao => {
      this.topicosDiscussao = topicoDiscussao
    })
  }

}
