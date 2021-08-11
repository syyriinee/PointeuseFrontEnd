import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../shared/layout/layout.component';
import { ListeCongesComponent } from './components/Conges/liste-conges/liste-conges.component';
import { ListEmployeesComponent } from './components/Employees/list-employees/list-employees.component';
import { ListeMissionsComponent } from './components/Missions/liste-missions/liste-missions.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'employees', component: ListEmployeesComponent },
      { path: 'conges', component: ListeCongesComponent },
      { path: 'missions', component: ListeMissionsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointeuseAppRoutingModule { }
