import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Carrinho } from '../models/carrinho';
import { Ingresso } from '../models/ingresso';
import { ItemCarrinho } from '../models/item-carrinho';
import { Usuario } from '../models/usuario';
import { CarrinhoService } from '../services/carrinho.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-detalhes-eventos',
  templateUrl: './detalhes-eventos.page.html',
  styleUrls: ['./detalhes-eventos.page.scss'],
})
export class DetalhesEventosPage implements OnInit {

  @Input() evento;
  quantidade = 1;
  usuario: Usuario = null;


  constructor(private modalController: ModalController,
    private carrinhoService: CarrinhoService,
    private loginService: LoginService,
    private toastController: ToastController,
    private loadingController: LoadingController) { }

  ngOnInit() {
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

  cancelar() {
    this.quantidade = 1;
    this.modalController.dismiss()
  }

  async addCarrinho(evento) {
    this.presentLoading("Adicionando ao carrinho");
    await this.carrinhoService.getCarrinhoByUser().subscribe(
      value => {
        let carrinho: Carrinho = value;

        for (let i = 1; i <= this.quantidade; i++) {
          let ingresso: Ingresso = {
            id: 0,
            cpf: this.usuario.cpf,
            nome: this.usuario.nome,
            evento: evento,
            usuario: this.usuario
          }

          let item: ItemCarrinho = {
            id: 0,
            ingresso: ingresso
          }

          carrinho.itemCarrinhos.push(item);
        }
        console.log(carrinho);
        this.carrinhoService.save(carrinho).subscribe(
          value => {
            this.presentToast("Ingressos adicionados ao carrinho");
            this.loadingController.dismiss();
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
