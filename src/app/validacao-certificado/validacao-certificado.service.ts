import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Certificado } from './certificado';
import { Observable } from 'rxjs';

const URL_API = 'http://localhost:51990/api/';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoCertificadoService {

  constructor(private http: HttpClient) { }

  validarCertificado(codigo: string): Observable<Certificado>{
    return this.http.get<Certificado>(URL_API + '/usuario/validar-certificado/' + codigo)
  }
}
