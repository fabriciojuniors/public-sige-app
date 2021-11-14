import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro-usuario',
    loadChildren: () => import('./cadastro-usuario/cadastro-usuario.module').then( m => m.CadastroUsuarioPageModule)
  },
  {
    path: 'detalhes-eventos',
    loadChildren: () => import('./detalhes-eventos/detalhes-eventos.module').then( m => m.DetalhesEventosPageModule)
  },
  {
    path: 'pagamento',
    loadChildren: () => import('./pagamento/pagamento.module').then( m => m.PagamentoPageModule)
  },
  {
    path: 'listagem-ingressos',
    loadChildren: () => import('./listagem-ingressos/listagem-ingressos.module').then( m => m.ListagemIngressosPageModule)
  },
  {
    path: 'validacao-ingresso',
    loadChildren: () => import('./validacao-ingresso/validacao-ingresso.module').then( m => m.ValidacaoIngressoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule {}
