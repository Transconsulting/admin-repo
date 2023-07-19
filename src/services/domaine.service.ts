import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Domaine } from 'src/models/domaine';
import { Habitation } from 'src/models/Habitation';

enum DomaineStatut{
  ANNONCE='ANNONCE',
    LOUER='LOUER',
    VENDU='VENDU'
}

@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  private _urlNameDomaine:string = `${environment.url_backend}/domaine`;
  private _urlNameDomaineByProprietaire:string = `${environment.url_backend}/domaine/listeByProprietaire`;
  private _urlNameDomaineByStatutAndProprietaire:string = `${environment.url_backend}/domaine/listeByStatutAndProprietaire`;
  private _urlNameHabitationByStatutAndDomaine:String = `${environment.url_backend}/parcelleAppartemnt/listeByStatutAndDomaine`;
  private _urlNameHabitationStatutAndDomainetest:String = `${environment.url_backend}/domaine/listeByStatutAndProprietaire`;

  constructor(private httpClient:HttpClient) { }

  addDomaine(domaine:Domaine){
    return this.httpClient.post<Domaine>(
      `${this._urlNameDomaine}`,
      domaine,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  getDomain(){
    return this.httpClient.get<Domaine[]>(`${this._urlNameDomaine}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getDomaines(uuid:string){
    return this.httpClient.get<Domaine[]>(`${this._urlNameDomaineByProprietaire}/${uuid}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getDomaineByStatut(uuid:string){
    return this.httpClient.get<Domaine[]>(`${this._urlNameDomaineByStatutAndProprietaire}/${DomaineStatut.ANNONCE}/${uuid}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getDomaineByStatutAndProprietaire(uuid:string){
    return this.httpClient.get<Domaine[]>(`${this._urlNameHabitationStatutAndDomainetest}/${DomaineStatut.ANNONCE}/${uuid}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }
  getHabitationByStatutAndDomaine(uuid:string){
    return this.httpClient.get<Habitation[]>(`${this._urlNameHabitationByStatutAndDomaine}/${DomaineStatut.ANNONCE}/${uuid}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }
  
  getDomaine(uuid:String){
    return this.httpClient.get<Domaine>(`${this._urlNameDomaine}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    );
  }

  updateDomaine(domaine:Domaine){
    return this.httpClient.put<Domaine>(
      `${this._urlNameDomaine}/${domaine.uuid}`,
      domaine,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deleteDomaine(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNameDomaine}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }


  statutDomaines(){
    return this.httpClient.get<[string]>(`${environment.url_backend}/allListeByStatutDomaine`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  statutAnonceDomaine(){
    return this.httpClient.get<[string]>(`${environment.url_backend}/allListeByStatutDomaine`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  typeDomaine(){
    return this.httpClient.get<[string]>(`${environment.url_backend}/allListeByTypeDomaine`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  typeAnonce(){
    return this.httpClient.get<[string]>(`${environment.url_backend}/allListeByTypeAnnonce`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }
}

