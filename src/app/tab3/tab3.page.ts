import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario.page';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  usuario = null;
  constructor(private modalController : ModalController, private router : Router, private loginService : LoginService) {
    this.usuario = loginService.getUsuario()
  }
  ngOnInit(): void {
    this.loginService.usuarioLogado.subscribe(value => {
      this.usuario = value;
    })
  }

  async atualizarDados(){
    const modal = await this.modalController.create({
      component: CadastroUsuarioPage,
      componentProps: {
        'titulo': 'Atualizar dados',
        'usuario': this.usuario,
        'txtBotao': 'Atualizar dados',
        'editar': false,
        'msgSucesso': 'Dados atualizados com sucesso'
      },
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
  }
}
