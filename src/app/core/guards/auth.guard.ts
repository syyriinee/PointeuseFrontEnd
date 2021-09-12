import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private notificationService: NotificationService,
        private authService: AuthenticationService) { }

    canActivate() {
        const user = this.authService.currentUser;
        console.log("iciiiiiiiiiiii",user)

        if (user) {
            return true;
        }

        this.router.navigate(['auth/login']);
        return false;
    }
}
