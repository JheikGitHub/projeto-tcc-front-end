import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidacaoCertificadoComponent } from './validacao-certificado/validacao-certificado.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule, 
    ReactiveFormsModule
  ],
  declarations: [ValidacaoCertificadoComponent]
})
export class ValidacaoCertificadoModule { }
