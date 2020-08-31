import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/service/auth.service';
import { MenuController, NavController } from '@ionic/angular';
import { Message } from 'src/model/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formGroup : FormGroup;
  message : Message;
  msg : string = null;

  constructor(private formBuilder : FormBuilder,
    private auth : AuthService,
    private menuCtrl : MenuController,
    public navCtrl : NavController
    ) { 
      this.menuCtrl.enable(false);
      this.iniciarForm();
    }

  ngOnInit() {
  }
  
  iniciarForm(){
    this.formGroup= this.formBuilder.group({
      username : ['',[Validators.email] ],
      password : ['', [Validators.required, Validators.minLength(13), Validators.maxLength(16)]]
    })
  }

  logar(){
    this.auth.login(this.formGroup.value).subscribe(data=>{
      this.message = data.body.message;
      if(this.message.code == 200){
        this.menuCtrl.enable(true); // vai habilitar o menu quando logar
        this.auth.setToken(this.message.text);
        this.navCtrl.navigateRoot(['noticias-list']);
      }else{
        this.msg = "Login Inválido!";

      }
    })
  }


}
