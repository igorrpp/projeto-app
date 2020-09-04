import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/model/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/service/usuario.service';
import { TemplatesService } from 'src/service/templates';

@Component({
  selector: 'app-usuarios-update',
  templateUrl: './usuarios-update.page.html',
  styleUrls: ['./usuarios-update.page.scss'],
})
export class UsuariosUpdatePage implements OnInit {

  usuario: Usuario = new Usuario();
  formGroup: FormGroup;

  constructor(private actRoute: ActivatedRoute,
    private usuarioServ: UsuarioService,
    private formBuilder: FormBuilder,
    private templateServ : TemplatesService) {
    this.iniciarForm();
    console.log(this.formGroup.value);
  }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(resp => {
      let id = resp.get('id');
      this.usuarioServ.usuarioId(id).subscribe(data => {
        this.usuario = data as unknown as Usuario;
        this.iniciarForm();
        console.log(this.formGroup.value);
      })
    })
  }

  iniciarForm() {
    this.formGroup = this.formBuilder.group({
      id: [this.usuario.id, [Validators.required, Validators.minLength(5)]],
      name: [this.usuario.name, [Validators.required, Validators.minLength(5)]],
      foto: [this.usuario.foto, [Validators.required, Validators.minLength(5)]],
      Cidade: [this.usuario.Cidade, [Validators.required, Validators.minLength(5)]],
      Estado: [this.usuario.Estado, [Validators.required, Validators.minLength(5)]],
      email: [this.usuario.email, [Validators.required, Validators.minLength(5)]],
      
    })

  }

  atualizar(){
    this.templateServ.loading.then(load=>{
      load.present();
    
    this.usuarioServ.atualiza(this.formGroup.value).subscribe(data=>{
      console.log(data);
      load.dismiss();
      this.templateServ.exibirMensagem("Atualizado com sucesso!");
    })
  })

  }


}
