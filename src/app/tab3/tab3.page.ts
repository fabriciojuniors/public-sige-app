import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  usuario = null;
  constructor(private modalController : ModalController, private router : Router) {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  }
  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
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
