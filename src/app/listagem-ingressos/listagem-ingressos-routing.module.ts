import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListagemIngressosPage } from './listagem-ingressos.page';

const routes: Routes = [
  {
    path: '',
    component: ListagemIngressosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListagemIngressosPageRoutingModule {}
