import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/model/noticia';
import { NOTICIAS } from 'src/environments/mock-noticias';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-noticias-list',
  templateUrl: './noticias-list.page.html',
  styleUrls: ['./noticias-list.page.scss'],
})
export class NoticiasListPage implements OnInit {

  public noticias : Noticia[] = NOTICIAS;

  constructor(private activatedRoute: ActivatedRoute,
    private route : Router,
    private navCtrl : NavController) { }

  ngOnInit() {
  }

  buscaPorId(noticiaObj : Noticia){
    this.navCtrl.navigateForward(['noticias-detalhe',noticiaObj.id]);

  }

}
