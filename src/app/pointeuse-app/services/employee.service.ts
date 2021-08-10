import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { EmployeeVM } from '../models/employeeVM.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: EmployeeVM[] = [
    new EmployeeVM(1, "syrine", "PDG", new Employee(1, "syrine", "PDG", new Date()), new Date()),
    new EmployeeVM(2, "safa", "Responsable", new Employee(1, "syrine", "PDG", new Date()), new Date()),
    new EmployeeVM(3, "heithem", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
    new EmployeeVM(4, "slah", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
    new EmployeeVM(5, "ali", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
    new EmployeeVM(6, "sameh", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
    new EmployeeVM(7, "kamel", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
    new EmployeeVM(8, "abdallah", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
    new EmployeeVM(9, "fathi", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
    new EmployeeVM(10, "kamilia", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
    new EmployeeVM(11, "mohammed", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
    new EmployeeVM(12, "Ilyes", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
  ];

  constructor(private http: HttpClient) { }

  listEmployees() {
    //return this.http.get(environment.backEndUrl + "/employees");
    return this.employees;
  }
}
