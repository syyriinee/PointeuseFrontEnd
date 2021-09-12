import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import 'rxjs/add/operator/delay';
import { of, EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    login(email: string, password: string) {

        let item={
            "email":email,
            "password":password
        };
       
        // return this.http.post(environment.backEndUrl + "/employees/authenticate", item)
        // .pipe(map((response: any) => {
        //     console.log(response)
        //      this.localStorage.setItem('currentUser', JSON.stringify(response));
        //     return true;
        // }));

        return of(true).delay(1000)
            .pipe(map((response: any) => {
                // store email and jwt token in local storage to keep user logged in between page refreshes
                this.localStorage.setItem('currentUser', JSON.stringify({
                    token: 'aisdnaksjdn,axmnczm',
                    isAdmin: true,
                    email: 'john.doe@gmail.com',
                    fonction: 'GRH',
                    id: '12312323232',
                    alias: 'john.doe@gmail.com'.split('@')[0],
                    expiration: moment().add(1, 'days').toDate(),
                    fullName: 'John Doe'
                }));

                return true;
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
    }

    passwordResetRequest(email: string) {
        return of(true).delay(1000);
    }

    changePassword(email: string, currentPwd: string, newPwd: string) {
        return of(true).delay(1000);
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).delay(1000);
    }
}
