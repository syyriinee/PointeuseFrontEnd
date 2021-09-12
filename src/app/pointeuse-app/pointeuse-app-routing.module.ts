import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { ListeDayOffsComponent } from './components/DayOffs/liste-dayOffs/liste-dayOffs.component';
import { ListEmployeesComponent } from './components/Employees/list-employees/list-employees.component';
import { ListeHolidayComponent } from './components/holiday/liste-holiday/liste-holiday.component';
import { ListeMissionsComponent } from './components/Missions/liste-missions/liste-missions.component';
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
      { path: 'admin/planning/new', component: SavePlanningComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointeuseAppRoutingModule { }
