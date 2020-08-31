import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';


@Injectable({
    providedIn: 'root',
})
export class TemplatesService {


    constructor(private loadingCtrl: LoadingController,
        private alertController: AlertController) {

    }

    loading = this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Carregando...',
        duration: 2000
    });

    exibirMensagem(texto : string){
    let alert = this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Mensagem',
        subHeader: '',
        message: texto,
        buttons: ['Finalizar']
    });

    alert.then(data=>{
        data.present();
    })
    
}
}