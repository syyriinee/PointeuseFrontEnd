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

  listCheckInOuts(currentUser: Employee) {
    console.log("------currentUser-----------");
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    //let params = new HttpParams().set("employee",JSON.stringify(currentUser));
    return this.http.post(environment.backEndUrl + "/getPointageList", currentUser, options)
      .pipe(map((list: any) => {
        return list;

      }));
  }
}
