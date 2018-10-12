import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Evento } from '../evento';
import { EventoService } from '../evento.service';

@Component({
  selector: 'app-detalhes-evento',
  templateUrl: './detalhes-evento.component.html',
  styleUrls: ['./detalhes-evento.component.css']
})
export class DetalhesEventoComponent implements OnInit {

  IdEvent: number;
  event: Evento = new Evento();
  message: string = '';
  inscritos: number = 0;

  constructor(
    private routeParams: ActivatedRoute,
    private router: Router,
    private service: EventoService) { }

  ngOnInit() {

    this.routeParams.params.subscribe(parans => this.IdEvent = +parans['id']);

    this.service.numeroDeInscritos(this.IdEvent).subscribe((data: number) => { this.inscritos = data });

    this.service.detailsEvent(this.IdEvent).subscribe(
      (data: Evento) => {
        this.event = data
     },
      (err: HttpErrorResponse) => {

        if (err.status == 401) {
          alert("Usuario não logado");
          this.router.navigate(["/login"])
        }
        else {
          this.message = "Falha ao busca evento. Tente novamente";
        }
      }
    );

  }


}
