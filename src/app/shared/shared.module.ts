import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuVoltarComponent } from './menu-voltar/menu-voltar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MenuVoltarComponent
  ],
  exports: [
    MenuVoltarComponent
  ]
})
export class SharedModule { }
