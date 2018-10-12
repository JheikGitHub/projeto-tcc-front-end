import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  hasMore: boolean = true;
  private users: User[] = [];
  pageSize: number = 1;
  pageIndex: number = 2;

  constructor(private usuarioService: UserService) { }

  ngOnInit() {
    this.usuarioService.getAllUser(this.pageSize, this.pageIndex).subscribe(
      (data: User[]) => {
        this.users = data
      },
      (err) => {
        console.log(err);
      }
    );
  }
  load() {
    this.usuarioService.getAllUser(++this.pageSize, this.pageIndex).subscribe(
      (data: User[]) => {
        this.users = this.users.concat(data)
        if (!data.length)
          this.hasMore = false;
      },
      (err) => { console.log(err) }
    )
  }


}
