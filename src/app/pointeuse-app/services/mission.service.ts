import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mission } from '../models/mission.model';
import { Employee } from '../models/employee.model';
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
    return this.http.post(environment.backEndUrl + "/mission/save/", item);
  }
  deleteMission(idItem: number) {
    return this.http.get(environment.backEndUrl + `/mission/delete/${idItem}`);
  }
}
