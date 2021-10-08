import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { CheckInOutComponent } from './components/check-in-out/check-in-out.component';
import { ListeDayOffsComponent } from './components/DayOffs/liste-dayOffs/liste-dayOffs.component';
import { ListEmployeesComponent } from './components/Employees/list-employees/list-employees.component';
import { ListeHolidayComponent } from './components/holiday/liste-holiday/liste-holiday.component';
import { ListeMissionsComponent } from './components/Missions/liste-missions/liste-missions.component';
import { MyPlanComponent } from './components/my-plan/my-plan.component';
import { PlanningComponent } from './components/planning/planning.component';
import { SavePlanningComponent } from './components/planning/save-planning/save-planning.component';
import { PointageComponent } from './components/uploadPointage/pointage.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'admin/pointage', component: PointageComponent },
      { path: 'admin/employees', component: ListEmployeesComponent },
      { path: 'admin/dayOffs', component: ListeDayOffsComponent },
      { path: 'admin/missions', component: ListeMissionsComponent },
      { path: 'admin/holidays', component: ListeHolidayComponent },
      { path: 'admin/planning', component: PlanningComponent },
      { path: 'admin/planning/:idPlanning', component: SavePlanningComponent },
      { path: 'admin/planning/new', component: SavePlanningComponent },
      { path: 'checkInOut', component: CheckInOutComponent },
      { path: 'myPlan', component: MyPlanComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointeuseAppRoutingModule { }
