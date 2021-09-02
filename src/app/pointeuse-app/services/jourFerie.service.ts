import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JourFerie } from '../models/jourFerie.model';


@Injectable({
  providedIn: 'root'
})
export class JourFerieService {

  jourFeries: JourFerie[] = [
    new JourFerie(1,"", new Date()),
    new JourFerie(2,"", new Date()),
    new JourFerie(3,"", new Date()),
    new JourFerie(4, "",new Date()),
    new JourFerie(5, "",new Date()),
    new JourFerie(6,"", new Date()),
  ];

  constructor(private http: HttpClient) { }

  listJourFeries() {
    //return this.http.get(environment.backEndUrl + "/employees");
    return this.jourFeries;
  }
}
