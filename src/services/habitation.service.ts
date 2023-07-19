import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Habitation } from 'src/models/Habitation';

@Injectable({
  providedIn: 'root'
})
export class HabitationService {

  private _urlNameHabitation:String = `${environment.url_backend}/parcelleAppartemnt`;
  

  constructor(private httpClient:HttpClient) { }

  addHabitation(habitation:Habitation){
    return this.httpClient.post<Habitation>(
      `${this._urlNameHabitation}`,
      habitation,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

 

  getHabitations(){
    return this.httpClient.get<Habitation[]>(`${this._urlNameHabitation}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getHabitation(uuid:String){
    return this.httpClient.get<Habitation>(`${this._urlNameHabitation}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  updateHabitation(habitation:Habitation){
    return this.httpClient.put<Habitation>(
      `${this._urlNameHabitation}/${habitation.uuid}`,
      habitation,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deleteHabitation(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNameHabitation}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }

}
