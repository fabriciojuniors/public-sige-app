import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DetalhesEventosPage } from '../detalhes-eventos/detalhes-eventos.page';
import { Eventos } from '../models/evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  hasNext;
  pagina = 1;
  eventos: Eventos[] = [];
  filtroNome = "";
  showLoading = true;

  constructor(private eventoService: EventoService,
    private toastController: ToastController,
    private modalController: ModalController) {
    this.loadData(null);
  }
  ngOnInit(): void {
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async loadData(evento) {
    if(this.filtroNome != ""){
      await this.filtro();
    }else{
      await this.getAll(this.pagina);
    }
    evento.target.complete()

  }

  async doRefresh(event) {
    this.pagina = 1;
    this.eventos = [];
    if(this.filtroNome != ""){
      await this.filtro();
    }else{
      await this.getAll(this.pagina);
    }
    event.target.complete();
  }

  getAll(pagina) {
    this.showLoading = true;
    this.eventoService.getAll(pagina).subscribe(
      value => {
        this.showLoading = false;
        this.hasNext = !value.last;
        this.pagina += 1;
        for (let evento of value.content) {
          this.eventos.push(evento);
        }
      },
      error => {
        this.showLoading = true;
        this.presentToast("Erro ao carregar eventos");
      }
    )
  }

  filtro(evento = null) {
    this.pagina = 1;
    this.eventos = [];
    this.showLoading = true;
    this.eventoService.getAllFiltro(this.filtroNome, this.pagina).subscribe(
      value => {
        this.showLoading = false;
        this.hasNext = !value.last;
        this.pagina += 1;
        for (let evento of value.content) {
          this.eventos.push(evento);
        }
      },
      error => {
        this.showLoading = false;
        this.presentToast("Erro ao carregar eventos");
      }
    )
  }

  async detalheEvento(evento){
    const modal = await this.modalController.create({
      component: DetalhesEventosPage,
      componentProps: {
        'evento': evento
      },
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
  }

}
