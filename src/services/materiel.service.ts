import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Materiel } from 'src/models/materiel';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  private _urlNameMateriel:string = `${environment.url_backend}/materiel`;

  constructor(private httpClient:HttpClient) { }

  addMateriel(materiel:Materiel){
    console.log(materiel)
    return this.httpClient.post<Materiel>(
      `${this._urlNameMateriel}`,
      materiel,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  getMateriels(){
    return this.httpClient.get<Materiel[]>(`${this._urlNameMateriel}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getMateriel(uuid:String){
    return this.httpClient.get<Materiel>(`${this._urlNameMateriel}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    );
  }

  updateMateriel(materiel:Materiel){
    return this.httpClient.put<Materiel>(
      `${this._urlNameMateriel}/${materiel.uuid}`,
      materiel,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deleteMateriel(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNameMateriel}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }
}
