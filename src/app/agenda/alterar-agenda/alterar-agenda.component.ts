import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Agenda } from '../agenda';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-alterar-agenda',
  templateUrl: './alterar-agenda.component.html',
  styleUrls: ['./alterar-agenda.component.css']
})
export class AlterarAgendaComponent implements OnInit {

  private form: FormGroup;
  private agenda: Agenda = new Agenda();

  constructor(
    private routeActivated: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private AgendaService: AgendaService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.agenda = this.routeActivated.snapshot.data['agenda'];

    this.atualizaCampos();
    console.log(this.form);

  }

  atualizaCampos() {
    this.form = new FormGroup({
      nome: new FormControl(this.agenda.Nome, [Validators.required, Validators.maxLength(100)]),
      dataInicio: new FormControl(this.agenda.DataInicio, [Validators.required]),
      dataEncerramento: new FormControl(this.agenda.DateEncerramento, [Validators.required]),
      descricao: new FormControl(this.agenda.Descricao, [Validators.required, Validators.maxLength(500)]),
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
  }

  onSubmit() {
    this.pegaValorDosInput();

    this.AgendaService.EditAgenda(this.agenda.Id, this.agenda).subscribe(
      () => {
        alert("Agenda alterada com sucesso");
        this.router.navigate(['/funcionario-dashboard/minhas-agendas']);
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          alert("Usuario não logado");
          this.router.navigate(["/login"])
        }
        else {
          alert("Falha ao alterar agenda. Por favor tente novamente");
        }
      }
    );

  }

}
