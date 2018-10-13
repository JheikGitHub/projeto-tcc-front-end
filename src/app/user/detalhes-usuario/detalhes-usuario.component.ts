import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-detalhes-usuario',
  templateUrl: './detalhes-usuario.component.html',
  styleUrls: ['./detalhes-usuario.component.css']
})
export class DetalhesUsuarioComponent implements OnInit {

  @Input() idUsuario: string = '';
  user: User;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.buscaUsuario(this.idUsuario).subscribe(
      (data: User) => { this.user = data },
      (err) => {
        console.log(err);
      }
    );
  }


}
