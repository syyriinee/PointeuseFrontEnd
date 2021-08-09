import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: Employee[] = [
    new Employee(1, "syrine", "PDG", 1, new Date()),
    new Employee(2, "safa", "Responsable", 1, new Date()),
    new Employee(3, "heithem", "Ouvrier", 2, new Date()),
    new Employee(4, "slah", "Ouvrier", 2, new Date()),
    new Employee(5, "ali", "Ouvrier", 2, new Date()),
    new Employee(6, "sameh", "Ouvrier", 2, new Date()),
    new Employee(7, "kamel", "Ouvrier", 2, new Date()),
    new Employee(8, "abdallah", "Ouvrier", 2, new Date()),
    new Employee(9, "fathi", "Ouvrier", 2, new Date()),
    new Employee(10, "kamilia", "Ouvrier", 2, new Date()),
    new Employee(11, "mohammed", "Ouvrier", 2, new Date()),
    new Employee(12, "Ilyes", "Ouvrier", 2, new Date()),
  ];

  constructor(private http: HttpClient) { }

  listEmployees() {
    //return this.http.get(environment.backEndUrl + "/employees");
    return this.employees;
  }
}
