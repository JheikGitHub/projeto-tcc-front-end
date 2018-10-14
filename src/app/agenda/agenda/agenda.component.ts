import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  public agenda
  public eventosAgenda = []
  buscarEventos = new FormControl('')

  constructor(private service: AgendaService,
    private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getAgenda(this.route.snapshot.params['nome-agenda']).subscribe(agenda => {
      this.agenda = agenda
    });

    this.service.getEventosAgenda(this.route.snapshot.params['nome-agenda']).subscribe(evento => {
      this.eventosAgenda = evento;
      this.spinner.hide();
    }, (err) => {console.log(err);})

  }

}
