import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointageUploadService {
 
  constructor(private http: HttpClient) { }

  
  uploadFile(fullPath: string, nameTable: string) {
    let params = new HttpParams().set("fullPath",fullPath).set("nameTable", nameTable);
    return this.http.post(environment.backEndUrl + "/upload/accessDataBase", params);
  }

}