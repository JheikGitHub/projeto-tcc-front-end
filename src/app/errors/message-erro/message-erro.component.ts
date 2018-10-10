import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-erro',
  templateUrl: './message-erro.component.html',
  styleUrls: ['./message-erro.component.css']
})
export class MessageErroComponent implements OnInit {

  @Input() text: string

  constructor() { }

  ngOnInit() {
  }

}
