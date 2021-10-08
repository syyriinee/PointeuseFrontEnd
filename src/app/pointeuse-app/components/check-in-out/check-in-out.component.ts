import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Moment } from 'moment';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CheckInOut } from '../../models/check-in-out.model';
import { Employee } from '../../models/employee.model';
import { CheckInOutService } from '../../services/check-in-out.service';
import { EmployeeService } from '../../services/employee.service';

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
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.css'],
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
export class CheckInOutComponent implements OnInit {
  displayedColumns: string[] = ['checkTime', 'checkType'];
  dataSource!: MatTableDataSource<CheckInOut>;
  date = new FormControl(moment());
  checkInOuts!: CheckInOut[];
  employes!: Employee[];
  pointage!: CheckInOut;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  currentUser!: any;

  month!: number;
  year!: number;

  constructor(private _checkInOutService: CheckInOutService, public dialog: MatDialog, private authService: AuthenticationService
    , @Inject('LOCALSTORAGE') private localStorage: Storage, private _employeeService: EmployeeService, private cdref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.loadCheckInOuts();

    });
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }


  loadCheckInOuts() {
    console.log("-----loadCheckInOuts-------------");
    console.log(this.currentUser);
    this._checkInOutService.listCheckInOuts(this.currentUser, this.month, this.year).subscribe(
      (dataSuccess: any) => {
        console.log("load list checkinout=", dataSuccess)
        this.checkInOuts = dataSuccess;
        this.dataSource = new MatTableDataSource(this.checkInOuts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log("load list checkinout error=", error)
      }
    );

    this._employeeService.getEmplFromSupervisor(this.currentUser.idEmp).subscribe(
      (dataSuccess: any) => {
        if (dataSuccess != null) {
          console.log("load emp=", dataSuccess)
          this.employes = dataSuccess;
          console.log("load  this.employes =", this.employes)
          this.employes = this.employes.map(item => item)
            .filter((value, index, self) => self.indexOf(value) === index);
        } else {
          console.log("load emp sup error")

        }

      },
      error => {
        console.log("load emp sup error=", error)
      }
    );
    this._checkInOutService.notifErreur(this.currentUser, this.month, this.year).subscribe(
      (dataSuccess: any) => {
        console.log("load list notifs=", dataSuccess)
        this.checkInOuts = dataSuccess;
        this.dataSource = new MatTableDataSource(this.checkInOuts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log("load list notifs error=", error)
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
    this.month = 1 + this.date.value.month();
    console.log("month", this.month)
    this.year = this.date.value.year();
    console.log("year", this.year)
  }


  choisirEmp(empl: Employee) {
    console.log("-----empl-----", empl);
    this._checkInOutService.listCheckInOuts(empl, this.month, this.year).subscribe(
      (dataSuccess: any) => {
        console.log("load list checkinout=", dataSuccess)
        this.checkInOuts = dataSuccess;
        this.dataSource = new MatTableDataSource(this.checkInOuts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log("load list checkinout error=", error)
      }
    );
  }
 
  
}

