import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CheckInOutService {
  authService: any;

  constructor(private http: HttpClient) { }

  listCheckInOuts(currentUser: Employee, month: number, year: number) {
    console.log("------currentUser-----------");
    console.log(currentUser);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
  
    return this.http.post(environment.backEndUrl + "/getPointageList", {currentUser,month,year}, options)
      .pipe(map((list: any) => {
        return list;

      }));
  }
  notifErreur(currentUser: Employee, month: number, year: number) {
    console.log("------currentUser-----------");
    console.log(currentUser);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
  
    return this.http.post(environment.backEndUrl + "/employe/anomalie", {currentUser,month,year}, options)
      .pipe(map((list: any) => {
        return list;

      }));
  }
}
