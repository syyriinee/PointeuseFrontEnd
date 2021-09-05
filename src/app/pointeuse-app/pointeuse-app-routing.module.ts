import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { ListeCongesComponent } from './components/Conges/liste-conges/liste-conges.component';
import { ListEmployeesComponent } from './components/Employees/list-employees/list-employees.component';
import { ListeJourFerieComponent } from './components/jourFerie/liste-jourFerie/liste-jourFerie.component';
import { ListeMissionsComponent } from './components/Missions/liste-missions/liste-missions.component';
import { PlanningComponent } from './components/planning/planning.component';
import { SavePlanningComponent } from './components/planning/save-planning/save-planning.component';
import { PointageComponent } from './components/pointage/pointage.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'pointage', component: PointageComponent },
      { path: 'employees', component: ListEmployeesComponent },
      { path: 'conges', component: ListeCongesComponent },
      { path: 'missions', component: ListeMissionsComponent },
      { path: 'jourFeries', component: ListeJourFerieComponent },
      { path: 'planning', component: PlanningComponent },
      { path: 'planning/new', component: SavePlanningComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointeuseAppRoutingModule { }
