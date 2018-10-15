import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-criar-topico-admin',
  templateUrl: './criar-topico-admin.component.html',
  styleUrls: ['./criar-topico-admin.component.css']
})
export class CriarTopicoAdminComponent implements OnInit {

  private nomeEvento: string = '';

  constructor(private activated: ActivatedRoute) { }

  ngOnInit() {
    this.nomeEvento = this.activated.snapshot.params['nomeEvento'];
  }


}
