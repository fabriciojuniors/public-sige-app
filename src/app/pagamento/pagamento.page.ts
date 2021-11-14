import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Carrinho, FormaPagamento } from '../models/carrinho';
import { Cartao } from '../models/cartao';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

  @Input() carrinho : Carrinho;
  cartao : Cartao = {
    id: 0,
    anoVencimento: 2021,
    mesVencimento: 1,
    cpf: '',
    numero: '',
    titular: ''
  }

  constructor(private modalController : ModalController,
    private alertController : AlertController,
    private carrinhoService : CarrinhoService,
    private toastController : ToastController,
    private loadingController : LoadingController,
    private router : Router) { }

  ngOnInit() {
    console.log(this.carrinho);
    
  }

  async cancelar(){
    const alert = await this.alertController.create({
      message: "Deseja cancelar o processo de pagamento?",
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.modalController.dismiss();
          }
        },
        {
          text: 'Não',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
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


  async finalizar(){
    this.presentLoading("Finalizando pedido");
    if(this.carrinho.formaPagamento == FormaPagamento.CARTAO){
      this.carrinho.cartao = this.cartao;
    }
    await this.carrinhoService.finalizar(this.carrinho).subscribe(
      value => {
        this.presentToast("Pedido finalizado com sucesso.");
        this.loadingController.dismiss();
        this.modalController.dismiss();
        this.router.navigateByUrl("/tabs/tab1");
      },
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
        }
        this.loadingController.dismiss();
      }
    )
    
  }

}
