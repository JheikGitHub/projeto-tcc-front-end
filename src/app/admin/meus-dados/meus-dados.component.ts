import { Component, OnInit } from '@angular/core';

import { User } from '../../user/user';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html'
})
export class AdminMeusDadosComponent implements OnInit {

  user: User;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getUser().subscribe(
      (data: User) => { this.user = data },
      (err) => {
        console.log(err);
      }
    );
  }

}