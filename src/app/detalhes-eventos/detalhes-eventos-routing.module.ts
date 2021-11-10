import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesEventosPage } from './detalhes-eventos.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesEventosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesEventosPageRoutingModule {}
