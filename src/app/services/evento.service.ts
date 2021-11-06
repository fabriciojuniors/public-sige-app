import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private http : HttpClient) { }

  getAll(pagina):Observable<any>{
    return this.http.get(`${BASE_URL}/evento/mobile?pagina=`+pagina);
  }

  getAllFiltro(filtro, pagina):Observable<any>{
    return this.http.get(`${BASE_URL}/evento/mobile/${filtro}?pagina=`+pagina);
  }
}
