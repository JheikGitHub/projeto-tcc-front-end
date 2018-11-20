import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

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
  pageIndex: number = 5;

  constructor(
    private usuarioService: UserService,
    private router: Router) { }

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

  delete(idUsuario) {
    let respota = confirm("Deseja realmente excluir esse usuario?")
    if (respota) {
      this.usuarioService.excluiUsuario(idUsuario).subscribe(
        () => {
          alert('Usuário excluido com sucesso!');
        },
        (err: HttpErrorResponse) => {
          if (err.status == 401) {
            alert("Usuario invalido.");
            this.router.navigate(['/login'])
          }
          else
            alert("Falha ao excluir usuario.");
        }
      );

    }

  }

}
