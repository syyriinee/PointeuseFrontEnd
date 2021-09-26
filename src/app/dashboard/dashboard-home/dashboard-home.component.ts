import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Details } from 'src/app/pointeuse-app/models/details.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DetailsService } from 'src/app/pointeuse-app/services/details.service';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';
import * as moment from 'moment';
import { Employee } from 'src/app/pointeuse-app/models/employee.model';
import { EmployeeService } from 'src/app/pointeuse-app/services/employee.service';

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
  dataSource!: MatTableDataSource<Details>;
  date = new FormControl(moment());
  employes!: string[];

  constructor(private notificationService: NotificationService,
    private _employeeService: EmployeeService,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.titleService.setTitle('Application de Pointage - Statistiques');
    this.logger.log('Statistiques');
    this.loadEmpl();

    setTimeout(() => {
      this.notificationService.openSnackBar('Bienvenu!');
    });
  }
  loadEmpl() {
    this._employeeService.getEmplFromSupervisor(this.currentUser).subscribe(
      (dataSuccess: any) => {
        console.log("load emp=", dataSuccess)
        this.employes = dataSuccess.content;
        console.log("load  this.employes =", this.employes)

      },
      error => {
        console.log("load emp error=", error)
      }
    );
  }


  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
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
    let month = 1 + this.date.value.month();
    console.log("month", month)
    let year = this.date.value.year();
    console.log("year", year)
  }
}
