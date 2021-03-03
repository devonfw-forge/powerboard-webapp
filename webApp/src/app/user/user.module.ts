import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DrillDownPageComponent } from './drill-down-page/drill-down-page.component';
import { AppRoutingModule } from '../app-routing.module';
import {NgxEchartsModule} from 'ngx-echarts';
import * as echarts from 'echarts';
import { CodequalityComponent } from './dashboard/codequality/codequality.component';
import { TeamspiritComponent } from './dashboard/teamspirit/teamspirit.component';
import { ClientsatisfactionComponent } from './dashboard/clientsatisfaction/clientsatisfaction.component';
import { BurndownComponent } from './dashboard/burndown/burndown.component';


@NgModule({
  declarations: [
    UserComponent,
    BreadcrumbComponent,
    DashboardComponent,
    DrillDownPageComponent,
    CodequalityComponent,
    TeamspiritComponent,
    ClientsatisfactionComponent,
    BurndownComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts,
    })
  ],
  exports: [BreadcrumbComponent]
})
export class UserModule { }
