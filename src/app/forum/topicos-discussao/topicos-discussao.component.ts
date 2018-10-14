import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ForumService } from '../forun.service';

@Component({
  selector: 'app-topicos-discussao',
  templateUrl: './topicos-discussao.component.html',
  styleUrls: ['./topicos-discussao.component.css']
})
export class TopicosDiscussaoComponent implements OnInit {

  private topicosDiscussao =  []

  constructor(private service: ForumService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.getAllTopicosDiscussao(this.route.snapshot.params['nome-evento']).subscribe(topicoDiscussao =>  {
      this.topicosDiscussao = topicoDiscussao
    })
  }

}
