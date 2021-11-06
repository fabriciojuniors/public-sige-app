import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Usuario } from '../models/usuario';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {

  public usuario : Usuario = {
    id: 0,
    cpf: "",
    nome: "",
    sexo: "#",
    nascimento: "",
    telefone: "",
    endereco: {
      id: 0,
      rua: "",
      numero: 0,
      uf: "#",
      cidade: "",
      complemento: "",
      cep: ""
    },
    cartoes: null,
    nivel: "C",
    email: "",
    senha: ""
  };

  constructor(private loginService : LoginService, private modalController : ModalController, private alertController : AlertController,
    public toastController: ToastController, public loadingController: LoadingController) { }

  ngOnInit() {
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

  async cancelar(){
    const alert = await this.alertController.create({
      message: "Deseja cancelar o processo de cadastro?",
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

  cadastrar(){
    this.presentLoading("Salvando registro");
    if(this.usuario.endereco.uf == "#" || this.usuario.endereco.uf == "") this.usuario.endereco.uf = null 
    if(this.usuario.sexo == "#" || this.usuario.sexo == "") this.usuario.sexo = null 
    if(this.usuario.nivel == "#" || this.usuario.nivel == "") this.usuario.nivel = null 
    this.loginService.salvar(this.usuario).toPromise()
      .then(res => {
        this.presentToast("Cadastro realizado com sucesso!")
        this.modalController.dismiss();
      })
      .catch(err => {        
        if(err.error.mensagem){
          this.presentToast(err.error.mensagem)
        }else if(err.error){
          let erros = JSON.stringify(err.error);
          erros = erros.split("{").join("");
          erros = erros.split("}").join("")
          erros = erros.split("\"").join("");
          erros = erros.split(":").join(": ");
          let errosA = erros.split(",").join("<br>");
          this.presentToast(errosA);
        }        
      })
      .finally( () => {
        this.loadingController.dismiss();
      }); 
    
  }

}
