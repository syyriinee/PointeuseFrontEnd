import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DayOff } from '../models/dayOff.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http: HttpClient) { }

  listDetailss(currentUser: Employee, month: number, year: number) {
    console.log("------currentUser-----------");
    console.log(currentUser);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
  
    return this.http.post(environment.backEndUrl + "/uploadStat/employee", {currentUser,month,year}, options)
      .pipe(map((list: any) => {
        return list;

      }));
  }

}
