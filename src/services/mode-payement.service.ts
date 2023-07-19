import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModePayement } from 'src/models/ModePayement';

@Injectable({
  providedIn: 'root'
})

export class ModePayementService {

  private _urlNameModePayement:String = `${environment.url_backend}/modepaiement`;

  constructor(private httpClient:HttpClient) { }

  ajoutModepayement(modepayement:ModePayement){
    return this.httpClient.post<ModePayement>(
      `${this._urlNameModePayement}`,modepayement,
      {
        headers: new HttpHeaders({
          "Content-type" : "application/json",
        }),
      });
  }
getModepayements(){
  return this.httpClient.get<ModePayement[]>(`${this._urlNameModePayement}`,
  {
    headers: new HttpHeaders({
      "Content-type" : "application/json",
    }),
  });
}

getModepayement(uuid:String){
  return this.httpClient.get<ModePayement[]>(
    `${this._urlNameModePayement}/${uuid}`,
  {
    headers: new HttpHeaders({
      "Content-type" : "application/json",
    }),
  });
}

modifierModepayement(modepayement:ModePayement){
  return this.httpClient.put<ModePayement>(
    `${this._urlNameModePayement}/${modepayement.uuid}`,modepayement,
  {
    headers: new HttpHeaders({
      "Content-type" : "application/json",
    }),
  });
}

deleteModepayement(uuid:String){
  return this.httpClient.delete<any>(
    `${this._urlNameModePayement}/${uuid}`,
    {
      headers: new HttpHeaders(
        {
          "Content-type" : "application/json",
        }),
    }).toPromise();
}

}
