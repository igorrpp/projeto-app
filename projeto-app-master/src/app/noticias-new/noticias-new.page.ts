import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/service/noticia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { TemplatesService } from 'src/service/templates';

@Component({
  selector: 'app-noticias-new',
  templateUrl: './noticias-new.page.html',
  styleUrls: ['./noticias-new.page.scss'],
})
export class NoticiasNewPage implements OnInit {

  formGroup: FormGroup;
  msg: string = null;


  constructor(private noticiaServ: NoticiaService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private TemplateServ : TemplatesService
    ) {
    this.iniciarForm();
  }

  ngOnInit() {
  }

  iniciarForm() {
    this.formGroup = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      conteudo: ['', [Validators.required, Validators.minLength(5)]],
      imagem: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  cadastrar() {

    this.TemplateServ.loading.then(load => {

      load.present();

      this.noticiaServ.novo(this.formGroup.value).subscribe(data => {
        
        this.formGroup.reset();
        load.dismiss();

        this.TemplateServ.exibirMensagem("Cadastrado com sucesso!")
        })

      })
  }
  }


