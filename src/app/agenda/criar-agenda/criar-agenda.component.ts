import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '../../user/user';
import { Agenda } from '../agenda';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-criar-agenda',
  templateUrl: './criar-agenda.component.html',
  styleUrls: ['./criar-agenda.component.css']
})
export class CriarAgendaComponent implements OnInit {

  private form: FormGroup;
  private user: User;
  private agenda: Agenda = new Agenda();

  constructor(
    private routeActivated: ActivatedRoute,
    private router: Router,
    private AgendaService: AgendaService) { }

  ngOnInit() {
    this.user = this.routeActivated.snapshot.data['user'];

    this.atualizaCampos();
  }

  atualizaCampos() {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      dataInicio: new FormControl('', [Validators.required]),
      dataEncerramento: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      imagem: new FormControl(null, Validators.required)
    })
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('imagem').setValue({
          value: reader.result.toString().split(',')[1]
        })
      }
    }
  }

  pegaValorDosInput() {

    this.agenda.Nome = this.form.get('nome').value;
    this.agenda.DataInicio = this.form.get('dataInicio').value
    this.agenda.DateEncerramento = this.form.get('dataEncerramento').value;
    this.agenda.Descricao = this.form.get('descricao').value;

    var path = this.form.get('imagem').value;
    this.agenda.PathImagem = path.value;

    this.agenda.FuncionarioId = this.user.Id;

  }

  onSubmit() {

    this.pegaValorDosInput();

    this.AgendaService.createAgenda(this.agenda).subscribe(
      () => {
        alert("Agenda cadastrada com sucesso");
        this.router.navigate(['/funcionario-dashboard/minhas-agendas']);
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          alert("Usuario não logado.");
          this.router.navigate(["/login"])
        }
        else {
          alert("Falha ao alterar agenda. Por favor tente novamente");
        }
      }
    );

  }
}
