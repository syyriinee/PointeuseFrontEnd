import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
export class ListEmployeesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['idEmp', 'nameEmp', 'fonction', 'superviser', 'birth', 'actions'];
  dataSource!: MatTableDataSource<EmployeeVM>;

  employees!: EmployeeVM[];
  employee!: Employee;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _employeeService: EmployeeService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadEmployees() {
    this.employees = this._employeeService.listEmployees();
    console.log(this.employees)
    this.dataSource = new MatTableDataSource(this.employees);
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