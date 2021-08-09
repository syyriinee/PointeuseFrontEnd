import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/pointeuse-app/models/employee.model';
import { EmployeeService } from 'src/app/pointeuse-app/services/employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['idEmp', 'nameEmp', 'fonction', 'superviser', 'birth', 'actions'];
  dataSource!: MatTableDataSource<Employee>;

  employees!: Employee[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _employeeService: EmployeeService) {
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
}