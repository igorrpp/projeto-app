import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/service/usuario.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { TemplatesService } from 'src/service/templates';

@Component({
  selector: 'app-usuarios-new',
  templateUrl: './usuarios-new.page.html',
  styleUrls: ['./usuarios-new.page.scss'],
})
export class UsuariosNewPage implements OnInit {

   formGroup: FormGroup;
  msg: string = null;


  constructor(private usuarioServ: UsuarioService,
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
      id: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      foto: ['', [Validators.required, Validators.minLength(5)]],
      Cidade: ['', [Validators.required, Validators.minLength(5)]],
      Estado: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      
    })
  }

  cadastrar() {

    this.TemplateServ.loading.then(load => {

      load.present();

      this.usuarioServ.novo(this.formGroup.value).subscribe(data => {
        
        this.formGroup.reset();
        load.dismiss();

        this.TemplateServ.exibirMensagem("Cadastrado com sucesso!")
        })

      })
  }
  }


