import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Details } from '../models/details.model';
import { Employee } from '../models/employee.model';
import { Horaire, Planning } from '../models/planning.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private http: HttpClient) {

  }

  listEmployees(): Observable<Employee[]> {
   
    return this.http.get<Employee[]>(environment.backEndUrl + "/employee/employeeList");
  }

  listFonctions(): Observable<string[]> {
   
    return this.http.get<string[]>(environment.backEndUrl + "/employee/ListFonctions");
  }

  listPlannings(): Observable<number[]> {
   
    return this.http.get<number[]>(environment.backEndUrl + "/employee/ListPlannings");
  }

  getEmplFromSupervisor(idItem: number) {
    console.log("----------id---------",idItem)
    let params = new HttpParams().set("id", idItem);
    return this.http.get(environment.backEndUrl + "/employee/LisBySupervisor/", { params: params });
  }

  getMyHoraire(item: Employee) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http.post<Horaire>(environment.backEndUrl + "/employee/planning",item, options);
  }

  saveEmployee(item: Employee) {
    //let params = new HttpParams().set('item',item)
    return this.http.post(environment.backEndUrl + "/save/Employee/",item);
  }

  deleteEmployee(idItem: number) {
    let params = new HttpParams().set('idItem', 'idItem')
    return this.http.post(environment.backEndUrl + "/delete/employee/", { params: params });
  }


  uploadEmployee(idItem: number, month: number, year: number) {
    let params = new HttpParams()
      .set('currentUser', idItem)
      .set('month', month)
      .set('year', year);
      console.log("iditem------------:",idItem)
      console.log("month------------:",month)
      console.log("year------------:",year)
    return this.http.post<Details>(environment.backEndUrl + "/uploadStat/employee", { params: params });
  }
}
