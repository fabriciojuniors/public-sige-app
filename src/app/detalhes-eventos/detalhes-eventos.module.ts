import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesEventosPageRoutingModule } from './detalhes-eventos-routing.module';

import { DetalhesEventosPage } from './detalhes-eventos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesEventosPageRoutingModule
  ],
  declarations: [DetalhesEventosPage]
})
export class DetalhesEventosPageModule {}
