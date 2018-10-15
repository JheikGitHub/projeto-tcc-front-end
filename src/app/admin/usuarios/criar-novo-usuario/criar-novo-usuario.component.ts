import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-criar-novo-usuario',
  templateUrl: './criar-novo-usuario.component.html',
  styleUrls: ['./criar-novo-usuario.component.css']
})
export class CriarNovoUsuarioComponent implements OnInit {

  private form: FormGroup
  
  private perfilUsuario: string;

  constructor(build: FormBuilder) { }

  ngOnInit() {
    this.form = new FormGroup({
      perfil: new FormControl('')
    });

  }

  pegaPerfil() {
    this.perfilUsuario = this.form.get('perfil').value;
  }

}
