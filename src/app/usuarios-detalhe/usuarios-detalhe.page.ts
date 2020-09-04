import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/service/usuario.service';

@Component({
  selector: 'app-usuarios-detalhe',
  templateUrl: './usuarios-detalhe.page.html',
  styleUrls: ['./usuarios-detalhe.page.scss'],
})
export class UsuariosDetalhePage implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private activatedRoute: ActivatedRoute,
    private route: Router,
    private usuarioServ: UsuarioService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.usuario.foto = null;
    this.activatedRoute.paramMap.subscribe(resp => {

      let id = resp.get('id');
      this.usuarioServ.usuarioId(id).subscribe(data => {
        this.usuario = data as unknown as Usuario;
        this.usuario.foto = this.usuarioServ.getImage(id);

      })
    })
  }

  atualizar(usuarioObj) {
    this.navCtrl.navigateForward(['usuarios-update', usuarioObj.id])

  }
  deletar(usuarioObj) {
    this.navCtrl.navigateForward(['usuarios-delete', usuarioObj.id])

  }
  upload(usuarioObj) {
    this.navCtrl.navigateForward(['usuarios-upload', usuarioObj.id])
  }

}
