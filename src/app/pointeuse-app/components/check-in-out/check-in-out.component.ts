import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CheckInOut } from '../../models/check-in-out.model';
import { Employee } from '../../models/employee.model';
import { CheckInOutService } from '../../services/check-in-out.service';

@Component({
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.css'],



})
export class CheckInOutComponent implements OnInit {
  displayedColumns: string[] = ['checkTime', 'checkType'];
  dataSource!: MatTableDataSource<CheckInOut>;

  checkInOuts!: CheckInOut[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  currentUser!: any;




  constructor(private _checkInOutService: CheckInOutService, public dialog: MatDialog, private authService: AuthenticationService
    ,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
  }

  ngOnInit(): void {
    this.loadCheckInOuts();
   // this.currentUser = this.authService.currentUser;

  }



  loadCheckInOuts() {
    console.log("-----loadCheckInOuts-------------");
    console.log(this.currentUser);
    this.currentUser=this.localStorage.getItem("currentUser");
    this._checkInOutService.listCheckInOuts(this.currentUser).subscribe(
      (dataSuccess: any) => {
        console.log("load list days off=", dataSuccess)
        this.checkInOuts = dataSuccess;
        this.dataSource = new MatTableDataSource(this.checkInOuts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log("load list days off error=", error)
      }
    );

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

