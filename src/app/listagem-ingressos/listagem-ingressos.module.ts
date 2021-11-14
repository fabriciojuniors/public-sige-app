import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListagemIngressosPageRoutingModule } from './listagem-ingressos-routing.module';

import { ListagemIngressosPage } from './listagem-ingressos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListagemIngressosPageRoutingModule
  ],
  declarations: [ListagemIngressosPage]
})
export class ListagemIngressosPageModule {}
