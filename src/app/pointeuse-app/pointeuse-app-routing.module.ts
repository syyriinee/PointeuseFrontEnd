import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { ListEmployeesComponent } from './components/Employees/list-employees/list-employees.component';
import { SaveEmployeeComponent } from './components/Employees/save-employee/save-employee.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'employees', component: ListEmployeesComponent },
      { path: 'employee/new', component: SaveEmployeeComponent },
      { path: 'employee/:id', component: SaveEmployeeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointeuseAppRoutingModule { }
