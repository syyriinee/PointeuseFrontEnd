import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/delay';
import { of, EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Employee } from 'src/app/pointeuse-app/models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    login(email: string, password: string) {
        console.log("-----service login-----");
        let paramss = new HttpParams().set("email", email).set("password", password);

        return this.http.post(environment.backEndUrl + "/employees/authenticate", paramss)
            .pipe(map((response: any) => {
                console.log("------auth success------");
                console.log(response)

                this.localStorage.setItem('currentUser', JSON.stringify(response));
                console.log("************");
               // console.log(this.localStorage.getItem("currentUser"));

            }));
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorage.removeItem('currentUser');
    }

    get currentUser(): any {
        // TODO: Enable after implementation
        let user: any = this.localStorage.getItem('currentUser');
        return JSON.parse(user);
        //return user;
    }

    passwordResetRequest(email: string) {
        return of(true).delay(1000);
    }

    changePassword(idEmp: number, oldPassword: string, newPassword: string) {
      console.log("----idEmp----------",idEmp);
      console.log("------oldPassword--------", oldPassword);
      console.log("----newPassword----------",newPassword);
        let paramss = new HttpParams().set("idEmp", idEmp).set("oldPassword", oldPassword).set("newPassword", newPassword);

        return this.http.post(environment.backEndUrl + "/employee/resetPSW", paramss);
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).delay(1000);
    }
}
