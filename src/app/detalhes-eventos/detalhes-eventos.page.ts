import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes-eventos',
  templateUrl: './detalhes-eventos.page.html',
  styleUrls: ['./detalhes-eventos.page.scss'],
})
export class DetalhesEventosPage implements OnInit {

  @Input() evento;

  constructor(private modalController : ModalController) { }

  ngOnInit() {
  }

  cancelar(){
    this.modalController.dismiss()
  }

}
