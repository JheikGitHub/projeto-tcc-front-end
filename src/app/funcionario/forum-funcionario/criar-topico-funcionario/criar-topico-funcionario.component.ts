import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-criar-topico-funcionario',
  templateUrl: './criar-topico-funcionario.component.html',
  styleUrls: ['./criar-topico-funcionario.component.css']
})
export class CriarTopicoFuncionarioComponent implements OnInit {


  private nomeEvento: string = '';

  constructor(private activated: ActivatedRoute) { }

  ngOnInit() {
    this.nomeEvento = this.activated.snapshot.params['nomeEvento'];
  }

}
