import { HttpClient } from '@angular/common/http';
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
    return this.http.post(environment.backEndUrl + "/holiday/save/", item);
  }
  
  deleteHoliday(idItem: number) {
    return this.http.get(environment.backEndUrl +  `/holiday/delete/${idItem}`);
  }
}
