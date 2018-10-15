import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TopicoDiscussao } from 'src/app/forum/topicos-discussao/topico-discussao';
import { ForumService } from 'src/app/forum/forun.service';

@Component({
  selector: 'app-lista-topicos-admin',
  templateUrl: './lista-topicos-admin.component.html',
  styleUrls: ['./lista-topicos-admin.component.css']
})
export class ListaTopicosAdminComponent implements OnInit {

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
