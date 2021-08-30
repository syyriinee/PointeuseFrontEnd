import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, of, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Employee } from 'src/app/pointeuse-app/models/employee.model';
import { EmployeeVM } from 'src/app/pointeuse-app/models/employeeVM.model';
import { EmployeeService } from 'src/app/pointeuse-app/services/employee.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SaveEmployeeComponent } from '../save-employee/save-employee.component';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  displayedColumns: string[] = ['idEmp', 'nameEmp', 'fonction', 'superviser', 'birth', 'actions'];
  dataSource!: MatTableDataSource<Employee>;

  employees!: Employee[];
  employee!: Employee;

  pageSize: number = 2;
  pageNumber: number = 0;
  resultsLength!: number;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _employeeService: EmployeeService, public dialog: MatDialog,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    console.log(this.paginator);
    if (this.paginator?.pageSize)
      this.pageSize = this.paginator.pageSize;

    if (this.paginator?.pageIndex)
      this.pageNumber = this.paginator.pageIndex;

    console.log("-------pageSize------------------");
    console.log(this.pageSize);
    console.log("-------pageNumber----*****--------------");
    console.log(this.pageNumber);

    // merge(this.paginator?.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       //this.cdRef.detectChanges(); // si on le meyt pas --> Exception expression has changed after it was checked.
    //       return this._employeeService.listEmployees(this.pageSize, this.pageNumber);
    //     }),
    //     map((data: any) => {
    //       //this.cdRef.detectChanges();
    //       this.resultsLength = data?.totalElements;
    //       return data;
    //     }),
    //     catchError(() => {
    //       //this.cdRef.detectChanges();
    //       return of([]);
    //     })
    //   ).subscribe((response: any) => {
    //     this.employees = response.content;

    //     console.log("-------loadEmployees------------------");

    //     console.log(this.employees);
    //     console.log("-------loadEmployees----*****--------------");

    //     this.dataSource = new MatTableDataSource(this.employees);
    //     console.log(this.paginator);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   });

    this._employeeService.listEmployees(this.pageSize, this.pageNumber).subscribe(
      (response: any) => {
        console.log(response);
        this.employees = response.content;

        console.log("ccccc",this.pageSize);
        console.log("ffffff",this.pageNumber);

        // this.paginator.pageIndex=this.pageNumber
        // this.paginator.pageSize=this.pageSize
        // console.log("eeeeeeeee",this.paginator);

        this.resultsLength = response.totalElements;
        this.paginator.length=this.resultsLength;
        console.log("this.resultsLength =", this.resultsLength);

        console.log("-------loadEmployees------------------");

        console.log(this.employees);
        console.log("-------loadEmployees----*****--------------");

        this.dataSource = new MatTableDataSource(this.employees);
        console.log(this.paginator);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err)
      });
  }

  paginatorChange(event: any) {
    this.loadEmployees();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSave(item?: EmployeeVM) {
    console.log("item=", item)
    if (!item)
      item = new EmployeeVM(0, "", "", undefined, new Date());

    const dialogRef = this.dialog.open(SaveEmployeeComponent, {
      width: '800px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.employee = result;
    });
  }

  onDelete(item: EmployeeVM) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '800px',
      data: {
        "title": "Supprimer Employé",
        "message": "Voulez vous vraiment supprimer " + item.nameEmp
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        //supprimer
        let index = this.dataSource.data.findIndex(x => x.idEmp == item.idEmp)
        this.dataSource.data.splice(index, 1)
        this.loadEmployees();
      }
    });
  }

}