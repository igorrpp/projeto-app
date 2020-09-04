import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/model/usuario';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from 'src/service/noticia.service';
import { UsuarioService } from 'src/service/usuario.service';

@Component({
  selector: 'app-usuarios-upload',
  templateUrl: './usuarios-upload.page.html',
  styleUrls: ['./usuarios-upload.page.scss'],
})
export class UsuariosUploadPage implements OnInit {

  toFile;
  usuario: Usuario = new Usuario();
  location : string = "";

  constructor(private actRoute: ActivatedRoute,
    private usuarioServ: UsuarioService,) { }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(resp => {

      let id = resp.get('id');
      this.usuarioServ.usuarioId(id).subscribe(data => {
        this.usuario = data as unknown as Usuario;
        this.location = this.usuarioServ.getImage(id);
        console.log(this.location);
        
      });
    });

  }

  submit() {
    const file = this.toFile.item(0);
    this.usuarioServ.fileUpload(file,"usuario"+this.usuario.id).then(data=>{
      console.log(data);
      this.location = data.location;
    })
   


  }

 
  onChange(event) {
    this.toFile = event.target.files;
    this.location = null;

    this.submit();
  }
}
