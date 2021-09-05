import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    //return this.http.get(environment.backEndUrl + "/employees");
    return this.plannings;
  }
}
