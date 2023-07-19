import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  private _urlNameAgentTotal:string = `${environment.url_backend}/agent/total`;
  private _urlNameClientTotal:string = `${environment.url_backend}/client/total`;
  private _urlNameProprietaireTotal:string = `${environment.url_backend}/proprietaire/total`;
 

  constructor(private httpClient:HttpClient) { }

 
  getAgentTotal(){
    return this.httpClient
      .get<any>(
        `${this._urlNameAgentTotal}`
      )
      .toPromise()
      .then((res) => res
      )
      .catch((error) => console.log(error));
  }

  getClientTotal(){
    return this.httpClient.get<number>(`${this._urlNameClientTotal}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getProprietaireTotal(){
    return this.httpClient.get<number>(`${this._urlNameProprietaireTotal}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  
}

