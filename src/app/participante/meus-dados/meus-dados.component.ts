import { Component, OnInit } from '@angular/core';

import { ParticipanteService } from '../participante.service';
import { Participant } from '../participante';

@Component({
  selector: 'app-participante-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css']
})
export class participanteMeusDadosComponent implements OnInit {

  private participant: Participant;

  constructor(
    private service: ParticipanteService) { }

  ngOnInit() {

    this.service.buscaParticipanteLogado().subscribe(
      (data: Participant) => {
        this.participant = data
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
