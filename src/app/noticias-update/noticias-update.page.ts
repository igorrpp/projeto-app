import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from 'src/service/noticia.service';
import { Noticia } from 'src/model/noticia';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TemplatesService } from 'src/service/templates';



@Component({
  selector: 'app-noticias-update',
  templateUrl: './noticias-update.page.html',
  styleUrls: ['./noticias-update.page.scss'],
})
export class NoticiasUpdatePage implements OnInit {

  noticia: Noticia = new Noticia();
  formGroup: FormGroup;

  constructor(private actRoute: ActivatedRoute,
    private noticiaServ: NoticiaService,
    private formBuilder: FormBuilder,
    private templateServ : TemplatesService) {
    this.iniciarForm();
    console.log(this.formGroup.value);
  }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(resp => {
      let id = resp.get('id');
      this.noticiaServ.noticiaId(id).subscribe(data => {
        this.noticia = data as unknown as Noticia;
        this.iniciarForm();
        console.log(this.formGroup.value);
      })
    })
  }

  iniciarForm() {
    this.formGroup = this.formBuilder.group({
      id: [this.noticia.id, [Validators.required, Validators.minLength(5)]],
      titulo: [this.noticia.titulo, [Validators.required, Validators.minLength(5)]],
      conteudo: [this.noticia.conteudo, [Validators.required, Validators.minLength(5)]],
      imagem: [this.noticia.imagem, [Validators.required, Validators.minLength(5)]],
    })

  }

  atualizar(){
    this.templateServ.loading.then(load=>{
      load.present();
    
    this.noticiaServ.atualiza(this.formGroup.value).subscribe(data=>{
      console.log(data);
      load.dismiss();
      this.templateServ.exibirMensagem("Atualizado com sucesso!");
    })
  })

  }


}
