import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointeuseAppRoutingModule } from './pointeuse-app-routing.module';
import { ListEmployeesComponent } from './components/Employees/list-employees/list-employees.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { SaveEmployeeComponent } from './components/Employees/save-employee/save-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ListEmployeesComponent,
    SaveEmployeeComponent
  ],
  imports: [
    CommonModule,
    PointeuseAppRoutingModule,
    HttpClientModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class PointeuseAppModule { }
