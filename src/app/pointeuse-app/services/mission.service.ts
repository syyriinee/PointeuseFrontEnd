import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mission } from '../models/mission.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  Missions: Mission[] = [
    new Mission(1, new Date(),new Date(),new Employee(2, "safa", "Responsable", new Date())),
    new Mission(2, new Date(),new Date(),new Employee(2, "safa", "Responsable", new Date())),
    new Mission(3, new Date(),new Date(),new Employee(2, "safa", "Responsable", new Date())),
    new Mission(4, new Date(),new Date(),new Employee(2, "safa", "Responsable", new Date())),
    new Mission(5, new Date(),new Date(),new Employee(2, "safa", "Responsable", new Date())),
    new Mission(6, new Date(),new Date(),new Employee(2, "safa", "Responsable", new Date())),
  ];

  constructor(private http: HttpClient) { }

  listMissions() {
    //return this.http.get(environment.backEndUrl + "/employees");
    return this.Missions;
  }
}
