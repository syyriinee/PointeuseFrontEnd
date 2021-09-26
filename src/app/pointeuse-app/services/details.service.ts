import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DayOff } from '../models/dayOff.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http: HttpClient) { }

  listDetailss() {
    return this.http.get(environment.backEndUrl + "/allDaysOff");
  }

  

}
