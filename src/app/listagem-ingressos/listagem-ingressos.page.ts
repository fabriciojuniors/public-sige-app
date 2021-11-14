import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Ingresso } from '../models/ingresso';
import { Usuario } from '../models/usuario';
import { IngressoService } from '../services/ingresso.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-listagem-ingressos',
  templateUrl: './listagem-ingressos.page.html',
  styleUrls: ['./listagem-ingressos.page.scss'],
})
export class ListagemIngressosPage implements OnInit {

  ingressos: Ingresso[] = [];
  usuario: Usuario;
  isLoading = false;

  constructor(private modalController: ModalController,
    private ingressoService: IngressoService,
    private loginService: LoginService,
    private alertController: AlertController,
    private loadingController : LoadingController) { }

  async ngOnInit() {
    await this.loginService.usuarioLogado.subscribe(value => {
      this.usuario = value;
    })
    this.getIngressos();
  }

  cancelar() {
    this.modalController.dismiss();
  }

  async presentLoading(msg) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: msg,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  getIngressos() {
    this.isLoading = true;
    this.ingressoService.getByUsuario(this.usuario.id).subscribe(
      value => {
        this.ingressos = value;
        this.isLoading = false;
      }
    )
  }

  async abrirIngresso(ingresso) {
    this.presentLoading("Carregando ingresso");
    let conteudo = JSON.stringify({
      id: ingresso.id,
      nome: ingresso.nome,
      cpf: ingresso.cpf
    })
    let URL = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${conteudo}`
    let reader = new FileReader();
    let imagem64 = '';
    await fetch(URL)
      .then(res => res.blob())
      .then(es => {
        reader.readAsDataURL(es);
        reader.onload = () => {
          imagem64 = reader.result.toString();
        }
      });
    setTimeout(() => {
      this.abrir(imagem64)
    }, 500);
    
  }

  async abrir(img){
    this.loadingController.dismiss();
    const alert = await this.alertController.create({
      header: 'Ingresso',
      message: `<img src='${img}' />`,
      buttons: ['OK']
    });

    await alert.present();
  }

}
