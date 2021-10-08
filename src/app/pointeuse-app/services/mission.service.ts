import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mission } from '../models/mission.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
 
  constructor(private http: HttpClient) { }

  listMissions() {
    return this.http.get(environment.backEndUrl + "/allMissions");
  }
  saveMission(item: Mission) {
//let params = new HttpParams().set("mission",JSON.stringify(item));
    return this.http.post(environment.backEndUrl + "/mission/save/", item);
  }

  deleteMission(idItem: number) {
    let params = new HttpParams().set("idMission",idItem);
    return this.http.delete<Mission>(environment.backEndUrl + "/mission/delete",{params});
  }
}
