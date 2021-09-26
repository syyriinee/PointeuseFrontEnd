import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';

@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    CustomMaterialModule
  ],
  entryComponents: []
})
export class DashboardModule { }
