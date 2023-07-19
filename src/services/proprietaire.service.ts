import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Proprietaire } from 'src/models/proprietaire';

@Injectable({
  providedIn: 'root'
})
export class ProprietaireService {

  private _urlNameProprietaire:string = `${environment.url_backend}/proprietaire`;

  constructor(private httpClient:HttpClient) { }

  addProprietaire(proprietaire:Proprietaire){
    return this.httpClient.post<Proprietaire>(
      `${this._urlNameProprietaire}`,
      proprietaire,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  getProprietaires(){
    return this.httpClient.get<Proprietaire[]>(`${this._urlNameProprietaire}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getProprietaire(uuid:String){
    return this.httpClient.get<Proprietaire>(`${this._urlNameProprietaire}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    );
  }

  updateProprietaire(proprietaire:Proprietaire){
    return this.httpClient.put<Proprietaire>(
      `${this._urlNameProprietaire}/${proprietaire.uuid}`,
      proprietaire,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deleteProprietaire(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNameProprietaire}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }
}
