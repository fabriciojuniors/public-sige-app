import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidacaoIngressoPageRoutingModule } from './validacao-ingresso-routing.module';

import { ValidacaoIngressoPage } from './validacao-ingresso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidacaoIngressoPageRoutingModule
  ],
  declarations: [ValidacaoIngressoPage]
})
export class ValidacaoIngressoPageModule {}
