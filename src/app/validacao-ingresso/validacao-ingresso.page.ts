import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, ToastController } from '@ionic/angular';
import { Eventos } from '../models/evento';
import { Ingresso } from '../models/ingresso';
import { IngressoService } from '../services/ingresso.service';

@Component({
  selector: 'app-validacao-ingresso',
  templateUrl: './validacao-ingresso.page.html',
  styleUrls: ['./validacao-ingresso.page.scss'],
})
export class ValidacaoIngressoPage implements AfterViewInit, OnDestroy {

  result = null;
  scanActive = false;
  evento: Eventos;
  ingresso : Ingresso;
  @Output() scanActiveEmitter = new EventEmitter<boolean>();

  constructor(private alertController: AlertController,
    private toastController: ToastController,
    private ingressoService : IngressoService) { }

    ngOnDestroy(): void {
      BarcodeScanner.stopScan();
    }
    
    ngAfterViewInit(): void {
      BarcodeScanner.prepare();
    }

    async presentToast(msg) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }

    async startScanner() {
      const allowed = await this.checkPermission()
      
      if(allowed){
        this.scanActive = true;
        this.scanActiveEmitter.emit(true);
        const result = await BarcodeScanner.startScan();
        if(result.hasContent){
          this.presentToast("Leitura realizada!");
          this.result = result.content;
          this.evento = JSON.parse(result.content);

          this.ingressoService.getById(this.evento.id).subscribe(
            value => {this.ingresso = value}
          )

          this.scanActive = false;
          this.scanActiveEmitter.emit(false);
        }
      }
  
    }
  
    async checkPermission() {
      return new Promise(async (resolve, reject) => {
        const status = await BarcodeScanner.checkPermission({ force: true });
  
        if (status.granted) {
          resolve(true);
        } else if (status.denied) {
          const alert = await this.alertController.create({
            header: 'Atenção!',
            message: 'Realize a liberação para acesso à câmera nas configurações',
            buttons: [{
              text: 'Não',
              role: 'cancel'
            },
            {
              text: 'Abrir configuraçções',
              handler: () => {
                resolve(false);
                BarcodeScanner.openAppSettings();
              }
            }]
          });
  
          await alert.present();
        }
  
      })
    }
  
    stopScanner(){
      BarcodeScanner.stopScan();
      this.scanActive = false;
      this.scanActiveEmitter.emit(false);
    }

    autorizarEntrada(ingresso){
      this.ingressoService.autorizar(ingresso.id).subscribe(
        value => {
          this.presentToast("Entrada autorizada.");
          this.ingresso = null;
        }
      )
    }

}
