import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointeuseAppRoutingModule } from './pointeuse-app-routing.module';
import { ListEmployeesComponent } from './components/Employees/list-employees/list-employees.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomMaterialModule } from '../custom-material/custom-material.module';

@NgModule({
  declarations: [
    ListEmployeesComponent
  ],
  imports: [
    CommonModule,
    PointeuseAppRoutingModule,
    HttpClientModule,
    CustomMaterialModule
  ]
})
export class PointeuseAppModule { }
