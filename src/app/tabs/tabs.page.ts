import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  usuario : Usuario;
  constructor(private loginService : LoginService) {
  }

  async ngOnInit() {
    await this.loginService.usuarioLogado.subscribe(value => {
      this.usuario = value;
    })
  }

}
