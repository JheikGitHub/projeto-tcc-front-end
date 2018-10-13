import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-dados-usuario',
  templateUrl: './detalhes-dados-usuario.component.html',
  styleUrls: ['./detalhes-dados-usuario.component.css']
})
export class DetalhesDadosUsuarioComponent implements OnInit {

  private id;
  constructor(
    private routeActivated: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.routeActivated.snapshot.params['id'];
    
  }

}
