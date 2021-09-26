import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Holiday } from '../models/holiday.model';


@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private http: HttpClient) { }

  listHolidays() {
    return this.http.get(environment.backEndUrl + "/joursFeries");
  }

  saveHoliday(item: Holiday) {
    let params = new HttpParams().set("holiday",JSON.stringify(item));
    return this.http.post(environment.backEndUrl + "/holiday/save/", params);
  }
  
  deleteHoliday(idItem: number) {
    let params = new HttpParams().set("idHoliday",idItem);
    return this.http.post(environment.backEndUrl +  "/holiday/delete/",params);
  }
}
