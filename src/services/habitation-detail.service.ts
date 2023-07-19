import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HabitationDetail } from 'src/models/HabitationDetail';

@Injectable({
  providedIn: 'root'
})
export class HabitationDetailService {

  private _urlNameHabitationDetail:String = `${environment.url_backend}/parcelleApartemntDetail`;
  private _urlNameHabitationDetailByHabitation:string = `${environment.url_backend}/parcelleApartementDetail`;



  constructor(private httpClient:HttpClient) { }

  addHabitationDetail(habitationDetail:HabitationDetail){
    return this.httpClient.post<HabitationDetail>(
      `${this._urlNameHabitationDetail}`,
      habitationDetail,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getHabitationDetaille(uuid:string){
    return this.httpClient.get<HabitationDetail[]>(`${this._urlNameHabitationDetailByHabitation}/${uuid}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getHabitationDetails(){
    return this.httpClient.get<HabitationDetail[]>(`${this._urlNameHabitationDetail}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }




  getHabitationDetail(uuid:String){
    return this.httpClient.get<HabitationDetail>(`${this._urlNameHabitationDetail}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  updateHabitationDetail(habitationDetail:HabitationDetail){
    return this.httpClient.put<HabitationDetail>(
      `${this._urlNameHabitationDetail}/${habitationDetail.uuid}`,
      habitationDetail,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deleteHabitationDetail(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNameHabitationDetail}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }

}
