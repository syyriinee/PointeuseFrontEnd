import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointeuseAppRoutingModule } from './pointeuse-app-routing.module';
import { ListEmployeesComponent } from './components/Employees/list-employees/list-employees.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { SaveEmployeeComponent } from './components/Employees/save-employee/save-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ListeCongesComponent } from './components/Conges/liste-conges/liste-conges.component';
import { SaveCongesComponent } from './components/Conges/save-conges/save-conges.component';
import { ListeMissionsComponent } from './components/Missions/liste-missions/liste-missions.component';
import { SaveMissionsComponent } from './components/Missions/save-missions/save-missions.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [
    ListEmployeesComponent,
    SaveEmployeeComponent,
    ListeCongesComponent,
    SaveCongesComponent,
    ListeMissionsComponent,
    SaveMissionsComponent
  ],
  imports: [
    CommonModule,
    PointeuseAppRoutingModule,
    HttpClientModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxMatDatetimePickerModule
  ]
})
export class PointeuseAppModule { }
