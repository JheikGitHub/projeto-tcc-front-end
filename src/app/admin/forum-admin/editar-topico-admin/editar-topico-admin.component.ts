import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-topico-admin',
  templateUrl: './editar-topico-admin.component.html',
  styleUrls: ['./editar-topico-admin.component.css']
})
export class EditarTopicoAdminComponent implements OnInit {

  private nomeEvento: string = '';

  constructor(private activated: ActivatedRoute) { }

  ngOnInit() {
    this.nomeEvento = this.activated.snapshot.params['nomeEvento'];
  }

}
