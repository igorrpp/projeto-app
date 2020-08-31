import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from 'src/service/noticia.service';
import { Noticia } from 'src/model/noticia';

@Component({
  selector: 'app-noticias-upload',
  templateUrl: './noticias-upload.page.html',
  styleUrls: ['./noticias-upload.page.scss'],
})
export class NoticiasUploadPage implements OnInit {

  toFile;
  noticia: Noticia = new Noticia();

  constructor(private actRoute: ActivatedRoute,
    private noticiaServ: NoticiaService,) { }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(resp => {

      let id = resp.get('id');
      this.noticiaServ.noticiaId(id).subscribe(data => {
        this.noticia = data as unknown as Noticia;
        console.log(this.noticia);
      });
    });

  }

  submit() {
    const file = this.toFile.item(0);
    this.noticiaServ.fileUpload(file,"noticia"+this.noticia.id)

  }
  onChange(event) {
    this.toFile = event.target.files;
  }
}
