import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Paiement } from 'src/models/Paiement';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private _urlNamePaiement:String = `${environment.url_backend}/paiement`;
  //private _urlNamePaiementByContrat:string = `${environment.url_backend}/contrat/detail`;



  constructor(private httpClient:HttpClient) { }

  addPaiement(paiement:Paiement){
    return this.httpClient.post<Paiement>(
      `${this._urlNamePaiement}/save`,
      paiement,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getPaiementleByContrat(uuid:string){
    return this.httpClient.get<Paiement[]>(`${this._urlNamePaiement}/${uuid}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getPaiements(){
    return this.httpClient.get<Paiement[]>(`${this._urlNamePaiement}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getPaiement(uuid:String){
    return this.httpClient.get<Paiement>(`${this._urlNamePaiement}/getByUuid/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  updatePaiement(paiement:Paiement){
    return this.httpClient.put<Paiement>(
      `${this._urlNamePaiement}/update/${paiement.uuid}`,
      paiement,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deletePaiement(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNamePaiement}/delete/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }

}
