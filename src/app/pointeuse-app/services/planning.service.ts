import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Planning } from '../models/planning.model';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  plannings: Planning[] = [
    new Planning(1, "safa"),
    new Planning(2, "safa"),
    new Planning(3, "safa"),
    new Planning(4, "safa"),
    new Planning(5, "safa"),
    new Planning(6, "safa"),
  ];
 
  constructor(private http: HttpClient) { }

  listPlannings() {
    return this.http.get(environment.backEndUrl + "/planning");
   
  }
  
  savePlanning(item: Planning) {
    let params = new HttpParams().set("planning",JSON.stringify(item));
    return this.http.post(environment.backEndUrl + "/planning/save/", params);
  }
  deletePlanning(idItem: number) {
    let params = new HttpParams().set("idPlanning",idItem);
    return this.http.post(environment.backEndUrl + "/planning/delete/",params);
  }
}
