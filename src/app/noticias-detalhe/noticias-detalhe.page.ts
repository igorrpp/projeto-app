import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/model/noticia';
import { NOTICIAS } from 'src/environments/mock-noticias';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NoticiaService } from 'src/service/noticia.service';

@Component({
  selector: 'app-noticias-detalhe',
  templateUrl: './noticias-detalhe.page.html',
  styleUrls: ['./noticias-detalhe.page.scss'],
})
export class NoticiasDetalhePage implements OnInit {

  noticia: Noticia = new Noticia();

  constructor(private activatedRoute: ActivatedRoute,
    private route: Router,
    private noticiaServ: NoticiaService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.noticia.imagem = null;
    this.activatedRoute.paramMap.subscribe(resp => {

      let id = resp.get('id');
      this.noticiaServ.noticiaId(id).subscribe(data => {
        this.noticia = data as unknown as Noticia;
        this.noticia.imagem = this.noticiaServ.getImage(id);

      })
    })
  }

  atualizar(noticiaObj) {
    this.navCtrl.navigateForward(['noticias-update', noticiaObj.id])

  }
  deletar(noticiaObj) {
    this.navCtrl.navigateForward(['noticias-delete', noticiaObj.id])

  }
  upload(noticiaObj) {
    this.navCtrl.navigateForward(['noticias-upload', noticiaObj.id])
  }

}
