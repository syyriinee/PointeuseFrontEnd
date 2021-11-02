import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Details } from 'src/app/pointeuse-app/models/details.model';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';
import * as moment from 'moment';
import { Employee } from 'src/app/pointeuse-app/models/employee.model';
import { EmployeeService } from 'src/app/pointeuse-app/services/employee.service';
import { DetailsService } from 'src/app/pointeuse-app/services/details.service';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DashboardHomeComponent implements OnInit {
  currentUser: any;
  displayedColumns: string[] = ['workingMinutes', 'daysOff', 'missions', 'ecart'];

  dataSource: MatTableDataSource<Details> = new MatTableDataSource();
  date = new FormControl(moment());
  employes!: Employee[];
  employesDetails!: Details[];
  month!: number;
  year!: number;

  constructor(private notificationService: NotificationService,
    private _employeeService: EmployeeService,
    private _detailsService: DetailsService,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.loadEmpDetails(this.currentUser);
    // this.titleService.setTitle('Application de Pointage - Statistiques');
    // this.logger.log('Statistiques');
    this.loadEmpl();

    setTimeout(() => {
      this.notificationService.openSnackBar('Bienvenu!');
    });
  }

  loadEmpl() {
    this._employeeService.getEmplFromSupervisor(this.currentUser.idEmp).subscribe(
      (dataSuccess: any) => {
        console.log("load emp=", dataSuccess)
        this.employes = dataSuccess;
        console.log("load  this.employes =", this.employes)
        this.employes.map(item => item)
          .filter((value, index, self) => self.indexOf(value) === index);
      },
      error => {
        console.log("load emp sup error=", error)
      }
    );
  }

  onEmployeeSelectList(employee: Employee) {
    console.log(employee)
    this.loadEmpDetails(employee);
  }

  loadEmpDetails(emp: Employee) {
    //load emp details
    this._detailsService.listDetailss(emp, this.month, this.year).subscribe(
      (dataSuccess: Details) => {
        console.log("load emp details =", dataSuccess)
        this.employesDetails = [dataSuccess];
        console.log("load  this.employes details =", this.employesDetails)
        this.dataSource.data = this.employesDetails;
      },
      error => {
        console.log("load emp details error=", error)
      }
    );
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    console.log("ctrlValue ====", ctrlValue)
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  dateFormat(type: string, event: any) {
    console.log("hiiii", type, event)
    console.log(this.date.value)
    this.month = 1 + this.date.value.month();
    console.log("month", this.month)
    this.year = this.date.value.year();
    console.log("year", this.year)
  }
  prepareHours(Minutes: number) {
    //console.log("workingMinutes",workingMinutes)
    if (Minutes == 0)
      return "pas des heures"
    else if (Minutes < 60)
      return Minutes + " min"
    else {
      let heures = Math.floor(Minutes / 60);
      let mins = Minutes % 60;
      return heures + " h" + mins + " min";
    }
  }
  
}