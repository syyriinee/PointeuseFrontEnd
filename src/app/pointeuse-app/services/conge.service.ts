import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conge } from '../models/conge.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  conges: Conge[] = [
    new Conge(1, new Date(),new Date(),new Employee(2, "safa", "Responsable", new Date())),
    new Conge(2, new Date(),new Date(),new Employee(2, "safa", "Responsable", new Date())),
    new Conge(3, new Date(),new Date(),new Employee(2, "safa", "Responsable", new Date())),
    new Conge(4, new Date(),new Date(),new Employee(2, "safa", "Responsable", new Date())),
    new Conge(5, new Date(),new Date(),new Employee(2, "safa", "Responsable", new Date())),
    new Conge(6, new Date(),new Date(),new Employee(2, "safa", "Responsable", new Date())),
  ];

  constructor(private http: HttpClient) { }

  listConges() {
    //return this.http.get(environment.backEndUrl + "/employees");
    return this.conges;
  }
}
