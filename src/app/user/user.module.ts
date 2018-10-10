import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmailRecuperarSenhaComponent } from './email-recuperar-senha/email-recuperar-senha.component';
import { ErrorsModule } from '../errors/errors.module';
import { RecuperaSenhaService } from './email-recuperar-senha/email-recupera-senha.service';
import { RecuperaSenhaComponent } from './recupera-senha/recupera-senha.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ErrorsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EmailRecuperarSenhaComponent,
    RecuperaSenhaComponent
  ],
  exports:[
    EmailRecuperarSenhaComponent,
    RecuperaSenhaComponent
  ],
  providers: [
    RecuperaSenhaService
  ]

})
export class UserModule { }
