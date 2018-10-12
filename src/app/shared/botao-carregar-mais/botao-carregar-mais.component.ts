import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-botao-carregar-mais',
  templateUrl: './botao-carregar-mais.component.html',
  styleUrls: ['./botao-carregar-mais.component.css']
})
export class BotaoCarregarMaisComponent implements OnInit {

  @Input() hasMore: boolean = false

  constructor() { }

  ngOnInit() {
  }


}
