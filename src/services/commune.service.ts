import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Commune } from 'src/models/Commune';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {

  private _urlNameCommune:string = `${environment.url_backend}/commune`;
  private _urlNameCommuneByVille:string = `${environment.url_backend}/commune/listeByVille`;

  constructor(private httpClient:HttpClient) { }

  addCommune(commune:Commune){
    console.log(commune)
    return this.httpClient.post<Commune>(
      `${this._urlNameCommune}`,
      commune,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
      }
    );
  }

  getCommunes(){
    return this.httpClient.get<Commune[]>(`${this._urlNameCommune}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }


  getCommunesByVille(uuid:String){
    return this.httpClient.get<Commune[]>(`${this._urlNameCommuneByVille}/${uuid}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getCommune(uuid:String){
    return this.httpClient.get<Commune>(`${this._urlNameCommune}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    );
  }

  updateCommune(commune:Commune){
    return this.httpClient.put<Commune>(
      `${this._urlNameCommune}/${commune.uuid}`,
      commune,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deleteCommune(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNameCommune}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }
}
