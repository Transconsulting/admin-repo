import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HabitationImage } from 'src/models/HabitationImage';

@Injectable({
  providedIn: 'root'
})
export class HabitationImageService {

  private _urlNameHabitationImage:String = `${environment.url_backend}/parcelleAppartemntImage`;
  private _urlNameHabitationImageByHabitation:string = `${environment.url_backend}/parcelleAppartemntImageByAppartementParcelle`;



  constructor(private httpClient:HttpClient) { }

  addHabitationImage(habitationImage:HabitationImage){
    console.log(habitationImage)
    return this.httpClient.post<HabitationImage>(
      `${this._urlNameHabitationImage}`,
      habitationImage,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getHabitationImagele(uuid:string){
    return this.httpClient.get<HabitationImage[]>(`${this._urlNameHabitationImageByHabitation}/${uuid}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getHabitationImages(){
    return this.httpClient.get<HabitationImage[]>(`${this._urlNameHabitationImage}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getHabitationImage(uuid:String){
    return this.httpClient.get<HabitationImage>(`${this._urlNameHabitationImage}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  updateHabitationImage(habitationImage:HabitationImage){
    return this.httpClient.put<HabitationImage>(
      `${this._urlNameHabitationImage}/${habitationImage.uuid}`,
      habitationImage,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  deleteHabitationImage(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNameHabitationImage}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }

}
