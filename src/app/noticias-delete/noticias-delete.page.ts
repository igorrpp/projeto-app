import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/model/noticia';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from 'src/service/noticia.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-noticias-delete',
  templateUrl: './noticias-delete.page.html',
  styleUrls: ['./noticias-delete.page.scss'],
})
export class NoticiasDeletePage implements OnInit {
noticia : Noticia = new Noticia();
  constructor(private actRoute : ActivatedRoute,
    private noticiaServ : NoticiaService,
    private navCtrl : NavController) { }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(resp => {
      let id = resp.get('id');
      this.noticiaServ.noticiaId(id).subscribe(data => {
        this.noticia = data as unknown as Noticia;
        console.log(this.noticia);
        
      
      })
    })
  }

  excluir(){
    this.noticiaServ.delete(this.noticia).subscribe(data=>{
      this.navCtrl.navigateRoot(['noticias-list']);
    })

  }

}
