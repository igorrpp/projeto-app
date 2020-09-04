import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsuarioService} from 'src/service/usuario.service';
import { TemplatesService } from 'src/service/templates';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.page.html',
  styleUrls: ['./usuarios-list.page.scss'],
})
export class UsuariosListPage implements OnInit {

  public usuarios: Usuario[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private route: Router,
    private navCtrl: NavController,
    private usuarioServ: UsuarioService,
    private templateServ: TemplatesService) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.templateServ.loading.then(load => {

      load.present();

      this.usuarioServ.getUsuarios().subscribe(data => {
        console.log(data);
        this.usuarios = data;

        load.dismiss();

      })
    })
  }

  buscaPorId(usuarioObj: Usuario) {
    this.navCtrl.navigateForward(['usuarios-detalhe', usuarioObj.id]);

  }

  loadData(event) {
    /* Chamado quando carregar o código */
    this.usuarioServ.getUsuarios().subscribe(data => {
      
      data.forEach(item=>{
        this.usuarios.push(item);
      })

      setTimeout(() => {
        console.log('Done');
        event.target.complete();

        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (data.length == 1000) {
          event.target.disabled = true;
        }
      }, 500);
    })
    
    
    

  }

}
