import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidacaoIngressoPage } from './validacao-ingresso.page';

const routes: Routes = [
  {
    path: '',
    component: ValidacaoIngressoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidacaoIngressoPageRoutingModule {}
