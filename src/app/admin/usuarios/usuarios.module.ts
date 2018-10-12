import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsuariosComponent } from './usuarios.component';
import { RouterModule } from '@angular/router';
import { UserModule } from '../../user/user.module';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    RouterModule
  ],
  declarations: [
    AdminUsuariosComponent
  ]
})
export class UsuariosModule { }
