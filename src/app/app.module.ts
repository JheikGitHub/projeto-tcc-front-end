import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ErrorsModule } from './errors/errors.module';
import { AccountModule } from './account/account.module';
import { AuthGuard } from './guarda-rotas/auth.guard';
import { UsuarioGuard } from './guarda-rotas/usuario.guard';
import { HomeModule } from './home/home.module';
import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './customUrlSerialize';
import { AgendaModule } from './agenda/agenda.module';
import { ValidacaoCertificadoModule } from './validacao-certificado/validacao-certificado.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ErrorsModule,
    HomeModule,
    AgendaModule,
    AccountModule,
    AppRoutingModule,
    ValidacaoCertificadoModule
  ],
  providers: [
    { provide: UrlSerializer, useClass: CustomUrlSerializer },
    AuthGuard,
    UsuarioGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
