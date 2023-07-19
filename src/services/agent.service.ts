import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Agent } from 'src/models/agent';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private _urlNameAgent:string = `${environment.url_backend}/agent`;

  constructor(private httpClient:HttpClient) { }

  addAgent(agent:Agent){
    console.log(agent)
    return this.httpClient.post<Agent>(
      `${this._urlNameAgent}`,
      agent,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  getAgents(){
    return this.httpClient.get<Agent[]>(`${this._urlNameAgent}`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }

  getAgent(uuid:String){
    return this.httpClient.get<Agent>(`${this._urlNameAgent}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    );
  }

  updateAgent(agent:Agent){
    return this.httpClient.put<Agent>(
      `${this._urlNameAgent}/${agent.uuid}`,
      agent,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
    console.log("Update agent...")
  }

  deleteAgent(uuid:String){
    console.log(uuid)
   return this.httpClient.delete<any>(`${this._urlNameAgent}/${uuid}`,
    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
    ).toPromise();
  }

  typeAgent(){
    return this.httpClient.get<[string]>(`${environment.url_backend}/allListeTypeAgent`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      });
  }
}
