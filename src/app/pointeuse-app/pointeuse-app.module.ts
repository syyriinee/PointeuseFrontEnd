import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointeuseAppRoutingModule } from './pointeuse-app-routing.module';
import { ListEmployeesComponent } from './components/Employees/list-employees/list-employees.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { SaveEmployeeComponent } from './components/Employees/save-employee/save-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ListeMissionsComponent } from './components/Missions/liste-missions/liste-missions.component';
import { SaveMissionsComponent } from './components/Missions/save-missions/save-missions.component';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { PointageComponent } from './components/uploadPointage/pointage.component';
import { PlanningComponent } from './components/planning/planning.component';
import { SavePlanningComponent } from './components/planning/save-planning/save-planning.component';
import { HoraireItemComponent } from './components/planning/horaire-item/horaire-item.component';
import { ListeDayOffsComponent } from './components/DayOffs/liste-dayOffs/liste-dayOffs.component';
import { SaveDayOffsComponent } from './components/DayOffs/save-dayOffs/save-dayOffs.component';
import { ListeHolidayComponent } from './components/holiday/liste-holiday/liste-holiday.component';
import { SaveholidayComponent } from './components/holiday/save-holiday/save-holiday.component';
import { CheckInOutComponent } from './components/check-in-out/check-in-out.component';

@NgModule({
  declarations: [
    ListEmployeesComponent,
    SaveEmployeeComponent,
    ListeDayOffsComponent,
    SaveDayOffsComponent,
    ListeMissionsComponent,
    SaveMissionsComponent,
    ListeHolidayComponent,
    SaveholidayComponent,
    PointageComponent,
    PlanningComponent,
    SavePlanningComponent,
    HoraireItemComponent,
    CheckInOutComponent

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
