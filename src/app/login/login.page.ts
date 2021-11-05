import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Usuario } from '../models/usuario';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = {
    id: 0,
    cpf: "",
    nome: "",
    sexo: "M",
    nascimento: "",
    telefone: "",
    endereco: {
      id: 0,
      rua: "",
      numero: 0,
      uf: "SC",
      cidade: "",
      complemento: "",
      cep: ""
    },
    cartoes: null,
    nivel: "A",
    email: "",
    senha: ""
  };

  showLoading = false;
  error = ""
  constructor(private loginService : LoginService, private router : Router, public toastController: ToastController, public loadingController: LoadingController) { }

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
  
  
  ngOnInit() {
    localStorage.removeItem("usuario");
  }

  entrar() {    
    this.presentLoading("Autenticando...");
    this.loginService.login(this.usuario).toPromise()
      .then(res => {
        let usuario = res;       
        this.loadingController.dismiss()
        if (usuario.nivel == "A") {
          this.presentToast("Acesso negado");
        } else {
          this.loginService.setUsuario(usuario);
          localStorage.setItem("usuario", JSON.stringify(usuario));
          this.router.navigateByUrl("tabs");
        }
      })
      .catch(err => {
        this.showLoading = false;
        this.presentToast(err.error.mensagem);
        this.loadingController.dismiss()
      })
  }

}
