import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ville } from 'src/models/ville';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  private _urlNameVille:string = `${environment.url_backend}/ville`;

  constructor(private httpClient:HttpClient) { }

  addVille(ville:Ville){
    console.log(ville)
    return this.httpClient.post<Ville>(
      `${this._urlNameVille}`,
      ville,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  getVilles(){
    return this.httpClient.get<Ville[]>(`${this._urlNameVille}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getVille(uuid:String){
    return this.httpClient.get<Ville>(`${this._urlNameVille}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    );
  }

  updateVille(ville:Ville){
    return this.httpClient.put<Ville>(
      `${this._urlNameVille}/${ville.uuid}`,
      ville,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deleteVille(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNameVille}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }



}
