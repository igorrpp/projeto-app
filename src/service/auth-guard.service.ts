import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import {AuthService} from './auth.service';



@Injectable()
export class AuthGuardService implements CanActivate{
    
    constructor(public auth: AuthService, public navCtrl : NavController){}

    /* Se não estiver logado, redireciona para página login */
    canActivate() : boolean {
        if(!this.auth.isLogg()){
            this.navCtrl.navigateRoot(['/login']);
            return false;
        }
        return true;

    }

}

