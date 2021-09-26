import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Injectable()

export class AuthGuardRole implements CanActivate, CanActivateChild, CanLoad {
    constructor(private router: Router, private authService: AuthenticationService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkUserRole(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {


        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {

        let url = `/${route.path}`;
        return this.checkUserRole(url);
    }

    checkUserRole(url: string): boolean {
        let access: boolean = true;

        if (url.startsWith("/admin")) {
            access = this.isAdmin;
        }

        if (!access) {
             //this.router.navigate(['/accessdenied/401']);
        }
        return true;
    }

    get isAdmin() {
        //return false;
        return this.authService.currentUser ? this.authService.currentUser.fonction == "GRH" : false;
    }

}