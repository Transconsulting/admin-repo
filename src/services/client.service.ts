import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from 'src/models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

   private _urlNameClient:string = `${environment.url_backend}/client`;

  constructor(private httpClient:HttpClient) { }

  addClient(client:Client){
    console.log(client)
    return this.httpClient.post<Client>(
      `${this._urlNameClient}`,
      client,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  getClients(){
    return this.httpClient.get<Client[]>(`${this._urlNameClient}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getClient(uuid:String){
    return this.httpClient.get<Client>(`${this._urlNameClient}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    );
  }

  updateClient(client:Client){
    console.log(client)
    return this.httpClient.put<Client>(
      `${this._urlNameClient}/${client.uuid}`,
      client,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deleteClient(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNameClient}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }
}
