import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/model/usuario';
import { Message } from 'src/model/message';
import { environment } from 'src/environments/environment';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    

    api: string = environment.apiUsuarios + "/usuarios/";
    s3Config = environment.awsAcess;
    // nome da pasta (bucket)
    bucketName = 'imagem-app';

    constructor(private http: HttpClient) {

    }

    novo(obj: Usuario): Observable<Message> {
        return this.http.post<Message>(`${this.api}`, obj);


    }

    getUsuarios(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${this.api}`);


    }

    usuarioId(id: string): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${this.api}/${id}`);
    }
    atualiza(obj: Usuario): Observable<any> {
        return this.http.put<any>(`${this.api}/${obj.id}`, obj);
    }
    delete(obj: Usuario): Observable<any> {
        return this.http.delete<any>(`${this.api}/${obj.id}`);
    }

    //nome do usuario + id + .jpg
    fileUpload(file, fileName): Promise<any> {


        const contentType = file.type;


        // vai gerar o nome do arquivo
        let name: string = file.name;
        let arrayFileName = name.split(',');
        let finalName = fileName + '.' + arrayFileName[1];

        const params = {
            Bucket: this.bucketName,
            Key: finalName,
            Body: file,
            ACL: 'public-read',
            ContentType: contentType

        };

        const bucket = new S3(this.s3Config);
        return bucket.upload(params).promise().then(data=>{
            return data;

        })
    }

    getImage(id){
        return  `${environment.bucketUsuario}/usuario${id}.jpg`;
      }


}