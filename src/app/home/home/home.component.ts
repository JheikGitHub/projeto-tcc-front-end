import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { HomeService } from '../home.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public agendas = []
  buscarAgendas = new FormControl('');

  constructor(private service: HomeService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.service.getAgendasEventos().subscribe(agenda => {
      this.agendas = agenda
      this.spinner.hide();
    })
  }


}
