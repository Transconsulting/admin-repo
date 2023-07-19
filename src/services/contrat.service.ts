import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contrat } from 'src/models/contrat';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private _urlNameContrat:string = `${environment.url_backend}/contrat`;


  constructor(private httpClient:HttpClient) { }

  addContrat(contrat:Contrat){
    return this.httpClient.post<Contrat>(
      `${this._urlNameContrat}`,
      contrat,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  getTypeContrat(){
    return this.httpClient.get<[string]>(`${environment.url_backend}/allListeByTypeContrat`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  getContrats(){
    return this.httpClient.get<Contrat[]>(`${this._urlNameContrat}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getContrat(uuid:String){
    return this.httpClient.get<Contrat>(`${this._urlNameContrat}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    );
  }

  updateContrat(contrat:Contrat){
    return this.httpClient.put<Contrat>(
      `${this._urlNameContrat}/${contrat.uuid}`,
      contrat,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deleteContrat(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNameContrat}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }
}
