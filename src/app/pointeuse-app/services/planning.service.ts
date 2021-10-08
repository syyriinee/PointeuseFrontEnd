import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Planning } from '../models/planning.model';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

 
 
  constructor(private http: HttpClient) { }

  listPlannings() {
    return this.http.get(environment.backEndUrl + "/planning");
   
  }
  listHorairesByPlan(idPlan: number) {
    let params = new HttpParams().set("idPlanning",idPlan);
    return this.http.get(environment.backEndUrl + "/planning/horaires",{params : params});
   
  }
  
  savePlanning(item: Planning) {
   // let params = new HttpParams().set("planning",JSON.stringify(item));
    return this.http.post(environment.backEndUrl + "/planning/save/",item);
  }
  deletePlanning(idItem: number) {
    let params = new HttpParams().set("idPlanning",idItem);
    return this.http.post(environment.backEndUrl + "/planning/delete/",params);
  }
}
