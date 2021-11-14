import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class IngressoService {

  constructor(private http : HttpClient) { }

  getByUsuario(id):Observable<any>{
    return this.http.get(`${BASE_URL}/ingresso/usuario/${id}`);
  }

  getById(id):Observable<any>{
    return this.http.get(`${BASE_URL}/ingresso/${id}`);
  }

  autorizar(id):Observable<any>{
    return this.http.post(`${BASE_URL}/ingresso/autorizar/${id}`, {});
  }
}
