import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.component';
import { Usuario } from '../models/usuario';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(private http: HttpClient,
    private loginService: LoginService) { }

  getCarrinhoByUser(): Observable<any> {
    let usuario: Usuario = null;
    this.loginService.usuarioLogado.subscribe(value => {
      usuario = value;
    })

    return this.http.get(`${BASE_URL}/carrinho/${usuario.id}`);
  }

  save(carrinho): Observable<any> {
    return this.http.post(`${BASE_URL}/carrinho`, carrinho);
  }

  finalizar(carrinho): Observable<any> {
    return this.http.post(`${BASE_URL}/carrinho/finalizar`, carrinho);
  }

}
