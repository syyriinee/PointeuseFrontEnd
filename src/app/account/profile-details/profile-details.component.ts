import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  fullName: string = "";
  email: string = "";
  fonction: string = "";

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.fullName = this.authService.currentUser.nameEmp;
    this.email = this.authService.currentUser.email;
    this.fonction = this.authService.currentUser.fonction;
  }

}
