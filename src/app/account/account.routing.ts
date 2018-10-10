import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CriarContaComponent } from './criar-conta/criar-conta.component';
import { EmailRecuperarSenhaComponent } from '../user/email-recuperar-senha/email-recuperar-senha.component';
import { RecuperaSenhaComponent } from '../user/recupera-senha/recupera-senha.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'criar-conta', component: CriarContaComponent },
  { path: 'email-recuperacao-senha', component: EmailRecuperarSenhaComponent },
  { path: 'recupera-senha/:id', component: RecuperaSenhaComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
