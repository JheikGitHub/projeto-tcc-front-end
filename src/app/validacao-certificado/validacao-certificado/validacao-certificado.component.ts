import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Certificado } from '../certificado';
import { ValidacaoCertificadoService } from '../validacao-certificado.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ParticipanteService, GerarCertificado } from 'src/app/participante/participante.service';

@Component({
  selector: 'app-validacao-certificado',
  templateUrl: './validacao-certificado.component.html',
  styleUrls: ['./validacao-certificado.component.css']
})
export class ValidacaoCertificadoComponent implements OnInit {

  private form: FormGroup;
  certificado: Certificado = new Certificado()
  certificadoValido: string = ''
  certificadoInvalido: string = ''

  constructor(private formBuild: FormBuilder, private service: ValidacaoCertificadoService, private servicePDF: ParticipanteService) { }

  ngOnInit() {
    this.form = this.formBuild.group({
      codigo: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3}[-|\/]{1}[0-9]{5}[-|\/]{1}[a-zA-Z]{3}')]]
    })
  }

  onSubmit() {
    this.service.validarCertificado(this.form.get('codigo').value).subscribe(certificado => {
    this.certificado = certificado
    this.certificadoValido = 'Certificado encontrado.'
    this.certificadoInvalido = ''  
    },
    (err: HttpErrorResponse) => {
      this.certificadoInvalido = 'Certificado não encontrado.' 
      this.certificadoValido = ''  
    })
  }

  gerarPdf() {
    let gerarCertificado: GerarCertificado = { UsuarioId: this.certificado.ParticipanteId, EventoId: this.certificado.EventoId };
    this.servicePDF.gerarPdf(gerarCertificado).subscribe(
      (res) => {
        var fileURL = URL.createObjectURL(res);
        window.open(fileURL),
          (err) => {
            alert("Erro ao exibir certificado")
          }
      })
  }
  
}
