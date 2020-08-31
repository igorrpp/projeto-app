import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/model/noticia';
import { NOTICIAS } from 'src/environments/mock-noticias';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NoticiaService } from 'src/service/noticia.service';
import { TemplatesService } from 'src/service/templates';

@Component({
  selector: 'app-noticias-list',
  templateUrl: './noticias-list.page.html',
  styleUrls: ['./noticias-list.page.scss'],
})
export class NoticiasListPage implements OnInit {

  public noticias : Noticia[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private route : Router,
    private navCtrl : NavController,
    private noticiaServ : NoticiaService,
    private templateServ : TemplatesService) { }
    
    ngOnInit(){

    }
    ionViewWillEnter() {
    this.templateServ.loading.then(load=>{

    load.present();
    
    this.noticiaServ.getNoticias().subscribe(data=>{
      console.log(data);
      this.noticias = data;

      load.dismiss();
      
    })
  })
  }

  buscaPorId(noticiaObj : Noticia){
    this.navCtrl.navigateForward(['noticias-detalhe',noticiaObj.id]);

  }

}
