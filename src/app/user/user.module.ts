import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DrillDownPageComponent } from './drill-down-page/drill-down-page.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    UserComponent,
    BreadcrumbComponent,
    DashboardComponent,
    DrillDownPageComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [BreadcrumbComponent]
})
export class UserModule { }
