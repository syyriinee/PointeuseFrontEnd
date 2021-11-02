import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Employee } from 'src/app/pointeuse-app/models/employee.model';
import { EmployeeService } from 'src/app/pointeuse-app/services/employee.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SaveEmployeeComponent } from '../save-employee/save-employee.component';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  displayedColumns: string[] = ['idEmp', 'nameEmp', 'fonction', 'email','birth', 'actions'];
  dataSource!: MatTableDataSource<Employee>;

  employees!: Employee[];
  employee!: Employee;

  pageSize: number = 10;
  pageNumber: number = 0;
  resultsLength!: number;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private _employeeService: EmployeeService, public dialog: MatDialog,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadEmployees();

  }

  loadEmployees() {
 
    this._employeeService.listEmployees().subscribe(
      (dataSuccess: any) => {
        console.log("load list employees=", dataSuccess)
        this.employees = dataSuccess;
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log("load list employees error=", error)
      }
    );
  }

  paginatorChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;

    this.loadEmployees();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSave(item?: Employee) {
    console.log("item=", item)
    if (!item)
      item = new Employee( "", "","", new Date());

    const dialogRef = this.dialog.open(SaveEmployeeComponent, {
      width: '800px',
      data: item
    });
  }

  onDelete(item: Employee) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '800px',
      data: {
        "title": "Supprimer Employé",
        "message": "Voulez vous vraiment supprimer " + item.nameEmp
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
       console.log("result = ----------- ",item.idEmp)
      this._employeeService.deleteEmployee(item.idEmp).subscribe(
        success=>{
          console.log(success)
          this.loadEmployees();
        },
        error=>{
          console.log(error)
        }
      );      
      }
    });
    
  }

}