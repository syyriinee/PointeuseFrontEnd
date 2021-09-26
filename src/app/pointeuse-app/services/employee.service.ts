import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private http: HttpClient) {

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

  getEmplFromSupervisor(item: Employee) {
    let params = new HttpParams().set("id", item.idEmp);
    return this.http.get(environment.backEndUrl + "/employee/LisBySupervisor/", { params });
  }

  getListFromSupervisor(item: Employee) {
    const params = new HttpParams()
      .append('item', 'item')
    return this.http.get(environment.backEndUrl + "/employee/LisBySupervisor/", { params: params });
  }

  saveEmployee(item: Employee) {
    const params = new HttpParams()
      .append('item', 'item')
    return this.http.post(environment.backEndUrl + "/saveEmployee/", { params: params });
  }

  deleteEmployee(idItem: number) {
    const params = new HttpParams()
      .append('idItem', 'idItem')
    return this.http.post(environment.backEndUrl + "/delete/employee/", { params: params });
  }


  uploadEmployee(idItem: number, month: number, year: number) {
    const params = new HttpParams()
      .append('idItem', 'idItem')
      .append('month', 'month')
      .append('year', 'year');
    return this.http.get(environment.backEndUrl + "/upload/employee/", { params: params });
  }
}
