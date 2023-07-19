import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ContratDetail } from 'src/models/ContratDetail';

@Injectable({
  providedIn: 'root'
})
export class ContratDetailService {

  private _urlNameContratDetail:String = `${environment.url_backend}/contratdetail`;
  //private _urlNameContratDetailByContrat:string = `${environment.url_backend}/contrat/detail`;



  constructor(private httpClient:HttpClient) { }

  addContratDetail(contratDetail:ContratDetail){
    return this.httpClient.post<ContratDetail>(
      `${this._urlNameContratDetail}/save`,
      contratDetail,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getContratDetailleByContrat(uuid:string){
    return this.httpClient.get<ContratDetail[]>(`${this._urlNameContratDetail}/${uuid}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getContratDetails(){
    return this.httpClient.get<ContratDetail[]>(`${this._urlNameContratDetail}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getContratDetail(uuid:String){
    return this.httpClient.get<ContratDetail>(`${this._urlNameContratDetail}/getByUuid/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  updateContratDetail(contratDetail:ContratDetail){
    return this.httpClient.put<ContratDetail>(
      `${this._urlNameContratDetail}/update/${contratDetail.uuid}`,
      contratDetail,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deleteContratDetail(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNameContratDetail}/delete/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }

}
