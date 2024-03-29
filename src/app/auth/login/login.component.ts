import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/delay';

import { AuthenticationService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { DayOffService } from 'src/app/pointeuse-app/services/dayOff.service';
import { Employee } from 'src/app/pointeuse-app/models/employee.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  loading: boolean = false;

  constructor(private router: Router,
    private titleService: Title,
    @Inject('LOCALSTORAGE') private localStorage: Storage,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService, private _dayOffService: DayOffService) {
  }

  ngOnInit() {
    this.titleService.setTitle('angular-material-template - Login');
    this.authenticationService.logout();
    this.createForm();
  }

  private createForm() {
    const savedUserEmail = localStorage.getItem('savedUserEmail');

    this.loginForm = new FormGroup({
      email: new FormControl(savedUserEmail, [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(savedUserEmail !== null)
    });
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const rememberMe = this.loginForm.get('rememberMe')?.value;

    this.loading = true;
    console.log("cliiiiiiiiiiick logoiin")
    this.authenticationService
      .login(email.toLowerCase(), password)
      .subscribe(
        (data: any) => {
          console.log("-----data---------------", data);
          if (data) {
            this.localStorage.setItem('currentUser', JSON.stringify(data));

            if (rememberMe) {
              localStorage.setItem('savedUserEmail', email);
            } else {
              localStorage.removeItem('savedUserEmail');
            }
            this.router.navigate(['/dashboard']);
          } else {
            this.notificationService.openSnackBar("Vérifier vos champs");
            this.loading = false;
          }

        },
        error => {
          console.log(error)
          this.notificationService.openSnackBar(error.error);
          this.loading = false;
        }
      );
  }

  resetPassword() {
    this.router.navigate(['/auth/password-reset-request']);
  }
}
