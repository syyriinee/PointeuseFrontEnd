import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DayOff } from '../models/dayOff.model';

@Injectable({
  providedIn: 'root'
})
export class DayOffService {

  constructor(private http: HttpClient) { }

  listDayOffs() {
    console.log("---listDayOffs----------");
    return this.http.get(environment.backEndUrl + "/allDaysOff");
  }

  saveDayOff(item: DayOff) {
    let params = new HttpParams().set("dayOff",JSON.stringify(item));
    return this.http.post(environment.backEndUrl + "/dayOff/save",params);
  }

  deleteDayOff(idItem: number) {
    let params = new HttpParams().set("idDayOff", idItem);
    return this.http.post(environment.backEndUrl + "/dayOff/delete/",params);
  }

}
