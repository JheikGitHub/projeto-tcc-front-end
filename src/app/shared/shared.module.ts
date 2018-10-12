import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuVoltarComponent } from './menu-voltar/menu-voltar.component';
import { MenuHomeComponent } from './menu-home/menu-home.component';
import { FooterComponent } from './footer/footer.component';
import { BotaoCarregarMaisComponent } from './botao-carregar-mais/botao-carregar-mais.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MenuVoltarComponent,
    MenuHomeComponent,
    FooterComponent,
    BotaoCarregarMaisComponent
  ],
  exports: [
    MenuHomeComponent,
    FooterComponent,
    MenuVoltarComponent,
    BotaoCarregarMaisComponent
  ]
})
export class SharedModule { }
