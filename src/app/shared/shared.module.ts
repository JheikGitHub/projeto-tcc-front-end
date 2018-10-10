import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuVoltarComponent } from './menu-voltar/menu-voltar.component';
import { MenuHomeComponent } from './menu-home/menu-home.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MenuVoltarComponent,
    MenuHomeComponent,
    FooterComponent
  ],
  exports: [
    MenuHomeComponent,
    FooterComponent,
    MenuVoltarComponent
  ]
})
export class SharedModule { }
