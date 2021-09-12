import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DayOff } from '../models/dayOff.model';

@Injectable({
  providedIn: 'root'
})
export class DayOffService {

  constructor(private http: HttpClient) { }

  listDayOffs() {
    return this.http.get(environment.backEndUrl + "/allDaysOff");
  }

  saveDayOff(item: DayOff) {
    return this.http.post(environment.backEndUrl + "/dayOff/save", item);
  }

  deleteDayOff(idItem: number) {
    return this.http.get(environment.backEndUrl + `/dayOff/delete/${idItem}`);
  }

}
