import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Quartier } from 'src/models/Quartier';

@Injectable({
  providedIn: 'root'
})
export class QuartierService {

  private _urlNameQuartier:string = `${environment.url_backend}/quartier`;
  private _urlNameQuartierByCommune:string = `${environment.url_backend}/quartier/listeByCommune`;

  
  constructor(private httpClient:HttpClient) { }

  addQuartier(quartier:Quartier){
    console.log(quartier)
    return this.httpClient.post<Quartier>(
      `${this._urlNameQuartier}`,
      quartier,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  getQuartiers(){
    return this.httpClient.get<Quartier[]>(`${this._urlNameQuartier}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  
  getQuartierByCommune(uuid:String){
    return this.httpClient.get<Quartier[]>(`${this._urlNameQuartierByCommune}/${uuid}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
  }

  getQuartier(uuid:String){
    return this.httpClient.get<Quartier>(`${this._urlNameQuartier}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    );
  }

  updateQuartier(quartier:Quartier){
    return this.httpClient.put<Quartier>(
      `${this._urlNameQuartier}/${quartier.uuid}`,
      quartier,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deleteQuartier(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNameQuartier}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }
}
