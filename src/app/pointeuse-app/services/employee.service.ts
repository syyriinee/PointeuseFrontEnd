import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { EmployeeVM } from '../models/employeeVM.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private host: any;

  // employees: EmployeeVM[] = [
  //   new EmployeeVM(1, "syrine", "PDG", new Employee(1, "syrine", "PDG", new Date()), new Date()),
  //   new EmployeeVM(2, "safa", "Responsable", new Employee(1, "syrine", "PDG", new Date()), new Date()),
  //   new EmployeeVM(3, "heithem", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
  //   new EmployeeVM(4, "slah", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
  //   new EmployeeVM(5, "ali", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
  //   new EmployeeVM(6, "sameh", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
  //   new EmployeeVM(7, "kamel", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
  //   new EmployeeVM(8, "abdallah", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
  //   new EmployeeVM(9, "fathi", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
  //   new EmployeeVM(10, "kamilia", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
  //   new EmployeeVM(11, "mohammed", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
  //   new EmployeeVM(12, "Ilyes", "Ouvrier", new Employee(2, "safa", "Responsable", new Date()), new Date()),
  // ];

  constructor(private http: HttpClient) {
    this.host = environment.backEndUrl;
  }

  listEmployees(pageSize: number, pageNumber: number): Observable<Employee[]> {
    let params = new HttpParams();
    console.log("***********listEmployees*************");
    if (pageNumber !== null) {
      params = params.set('page', pageNumber.toString());
    }
    if (pageSize) {
      params = params.set('size', pageSize.toString());
    }
    console.log(environment.backEndUrl + "/employee/employeeList");

    return this.http.get<Employee[]>(environment.backEndUrl + "/employee/employeeList", { params });
    
   
  }
  getListFromSupervisor(item: Employee) {
    //return this.http.get(environment.backEndUrl + "/employee/LisBySupervisor/", item);
  }

  saveEmployee(item: Employee) {
    return this.http.post(environment.backEndUrl + "/saveEmployee", item);
  }

  deleteEmployee(item: Employee) {
    return this.http.post(environment.backEndUrl + "/delete/employee",item);
  }


  uploadEmployee(idItem: number,month: number,year: number) {
    return this.http.get(environment.backEndUrl + `/upload/employee/${idItem}/${month}/${year}`);
  }
}
