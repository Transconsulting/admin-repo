import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Materiel } from 'src/models/materiel';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl:String = `${environment.url_backend}`;

  constructor(private httpClient:HttpClient) { }

  public getInteresse(){
   return this.httpClient.get(this.baseUrl+"/interese/listeIntereseByParcelApp/"+"2d88350c-c308-4a3f-b963-172b41fe9572")
  }

  public getAllNotification(){
    return this.httpClient.get(this.baseUrl+"/interese/liste")
   }
}
