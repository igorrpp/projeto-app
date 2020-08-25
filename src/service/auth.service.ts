import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from 'src/model/message';
import { JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {

    }

    login(obj: any): Observable<any> {
        return this.http.post<Message>(environment.apiAuth,
            obj,
            {
                observe: 'response',
                responseType: 'json'
            }

        )
    }

    getToken(): string {
        if (localStorage.getItem('token') !== null || localStorage.getItem('token') !== 'null') {
            return localStorage.getItem('token');
        } else {
            return null;
        }


    }

    removeToken(): void {
        localStorage.setItem('token', null);
    }
    
    isExp(): boolean {
        const decodedToken = new JwtHelperService().isTokenExpired(this.getToken());
        return decodedToken;
    }

    setToken(text: string){
        localStorage.setItem('token',text);

    }
  
    isLogg() {
        if(this.getToken()===null || this.getToken()==='null'){
            console.log('false');
            return false;
        }else{
            console.log('true');
            if(this.isExp()==true){
                return false;
            }else{
                return true;
            }
        }
    }
}

