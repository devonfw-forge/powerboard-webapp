import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardComponent } from './teams/components/dashboard/dashboard.component';
import { LinksComponent } from './teams/components/links/links.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { MultimediaComponent } from './teams/components/multimedia/multimedia.component';

import { ProjectDisplayComponent } from './teams/components/project-display/project-display.component';

import { ViewTeamComponent } from './config/components/team/view-team/view-team.component';
import { SlideshowComponent } from './teams/components/slideshow/slideshow.component';
import { SlideshowMultimediaComponent } from './teams/components/slideshow/slideshow-multimedia/slideshow-multimedia.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  
  {path:'config', loadChildren: () => import('./config/config.module').then(m=> m.ConfigModule)},
  { path:'teams', loadChildren: () => import('./teams/teams.module').then(m=> m.TeamsModule)},
  
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)  },
  
  { path: 'viewTeam', component: ViewTeamComponent },
  
  
 
  { path: '**', redirectTo: '/auth', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true}), NgxEchartsModule, BrowserAnimationsModule,],
  exports: [RouterModule],
})
export class AppRoutingModule {}
