import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profession } from 'src/models/proffession';

@Injectable({
  providedIn: 'root'
})
export class ProffessionService {

  private _urlNameProfession:string = `${environment.url_backend}/profession`;
 

  constructor(private httpClient:HttpClient) { }

  addProfession(profession:Profession){
    console.log(profession)
    return this.httpClient.post<Profession>(
      `${this._urlNameProfession}/save`,
      profession,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  getProfessions(){
    return this.httpClient.get<Profession[]>(`${this._urlNameProfession}/getAll`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getProfession(uuid:String){
    return this.httpClient.get<Profession>(`${this._urlNameProfession}/getByUuid/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    );
  }

  updateProfession(profession:Profession){
    return this.httpClient.put<Profession>(
      `${this._urlNameProfession}/${profession.uuid}/update`,
      profession,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deleteProfession(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNameProfession}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }

}
