import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account.routing';
import { LoginService } from './login/login.service';
import { CriarContaComponent } from './criar-conta/criar-conta.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CriarContaService } from './criar-conta/sign-in.service';
import { ErrorsModule } from '../errors/errors.module';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    UserModule,
    SharedModule,
    ErrorsModule,
    AccountRoutingModule
  ],
  declarations: [
    LoginComponent,
    CriarContaComponent
  ],
  providers: [
    LoginService,
    CriarContaService
  ]
})
export class AccountModule { }
