import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.component';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public usuario: Usuario = {
    id: 0,
    cpf: "",
    nome: "",
    sexo: "",
    nascimento: "",
    telefone: "",
    endereco: {
      id: 0,
      rua: "",
      numero: 0,
      uf: "",
      cidade: "",
      complemento: "",
      cep: ""
    },
    cartoes: null,
    nivel: "A",
    email: "",
    senha: ""
  };

  constructor(private http: HttpClient) {
    this.usuario = {
      id: 0,
      cpf: "",
      nome: "",
      sexo: "",
      nascimento: "",
      telefone: "",
      endereco: {
        id: 0,
        rua: "",
        numero: 0,
        uf: "",
        cidade: "",
        complemento: "",
        cep: ""
      },
      cartoes: null,
      nivel: "A",
      email: "",
      senha: ""
    };

  }

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  isAuthenticated() {
    let usuario:Usuario = JSON.parse(localStorage.getItem("usuario"));
    let isAuthenticated = false;

    if(usuario == null){
      return false;
    }

    if(this.usuario.id > 0 || usuario.id > 0){
      isAuthenticated = true;
    }

    if(usuario.id > 0 && this.usuario.id == 0){
      this.usuario = usuario;
    }
    
    return isAuthenticated;
  }

  getById(id): Observable<any> {
    return this.http.get(BASE_URL + "/usuario/busca/" + id);
  }

  login(usuario): Observable<any> {
    return this.http.post(BASE_URL + "/usuario/autenticar", usuario);
  }

  getPage(nivel : string, pagina: number): Observable<any>{
    return this.http.get(BASE_URL+"/usuario/"+nivel+"?pagina="+pagina);
  }

  salvar(usuario):Observable<any>{
    return this.http.post(BASE_URL+"/usuario", usuario);
  }

  excluir(id):Observable<any>{
    return this.http.delete(BASE_URL+"/usuario/"+id);
  }

}
