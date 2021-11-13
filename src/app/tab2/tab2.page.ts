import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Carrinho, FormaPagamento } from '../models/carrinho';
import { Usuario } from '../models/usuario';
import { CarrinhoService } from '../services/carrinho.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  carrinho: Carrinho = {
    id: 0,
    usuario: null,
    itemCarrinhos: [],
    valorTotal: 0,
    formaPagamento: null,
    cartao: null,
    statusPagamento: null,
    statusCarrinho: null
  };
  public isLoading: Boolean = false;
  usuario: Usuario = null;

  constructor(private carrinhoService: CarrinhoService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private loginService : LoginService) {
    this.getCarrinho();
    this.loginService.usuarioLogado.subscribe(value => {
      this.usuario = value;
    })
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading(msg) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: msg,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  ngOnInit(): void {
    this.loginService.usuarioLogado.subscribe(value => {
      this.usuario = value;
    })
    console.log(this.carrinho);

  }

  async getCarrinho() {
    this.isLoading = true;
    await this.carrinhoService.getCarrinhoByUser().subscribe(
      value => { this.carrinho = value; this.isLoading = false; },
      error => {
        if (error.error.mensagem) {
          this.presentToast(error.error.mensagem)
        } else if (error.error) {
          let erros = JSON.stringify(error.error);
          erros = erros.split("{").join("");
          erros = erros.split("}").join("")
          erros = erros.split("\"").join("");
          erros = erros.split(":").join(": ");
          let errosA = erros.split(",").join("<br>");
          this.presentToast(errosA);
          this.isLoading = false;
        }
      }
    )
  }

  async dadosIngresso(ingresso) {
    let contador = 0;

    this.carrinho.itemCarrinhos.forEach(item => {      
      if(item.ingresso.evento.id == ingresso.evento.id){
        if(item.ingresso.cpf == this.usuario.cpf){
          contador++;
        }
      }
    });

    if(contador > 1){
      ingresso.cpf = '';
      ingresso.nome = '';
    }

    const alert = await this.alertController.create({
      header: 'Dados do ingresso',
      buttons: [{
        text: 'Salvar',
        handler: (alertData) => {
          ingresso.nome = alertData.portador;
          ingresso.cpf = alertData.cpf;
          
          console.log(ingresso);
          console.log(this.carrinho.itemCarrinhos.forEach(e => {console.log(e);
          }));
          
          
        }
      }],
      inputs: [
        {
          name: 'portador',
          type: 'text',
          placeholder: 'Portador',
          value: ingresso.nome,
        },
        {
          name: 'cpf',
          type: 'text',
          placeholder: 'CPF',
          value: ingresso.cpf
        }
      ],
      
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

}

