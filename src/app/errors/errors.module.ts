import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './not-found/not-found.component';
import { MessageErroComponent } from './message-erro/message-erro.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NotFoundComponent,
    MessageErroComponent
  ],
  exports: [
    MessageErroComponent
  ]
})
export class ErrorsModule { }
