import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardComponent } from './teams/components/dashboard/dashboard.component';
import { LinksComponent } from './teams/components/links/links.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { MultimediaComponent } from './teams/components/multimedia/multimedia.component';

import { ProjectDisplayComponent } from './teams/components/project-display/project-display.component';


import { ConfigComponent } from './config/components/config/config.component';

import { SetupComponent } from './config/components/setup/setup.component';
import { TeamComponent } from './config/components/team/team.component';
import { ViewAllTeamMembersComponent } from './config/components/team/view-all-team-members/view-all-team-members.component';
import { AddTeamComponent } from './config/components/team/view-all-teams/add-team/add-team.component';
import { ViewAllTeamsComponent } from './config/components/team/view-all-teams/view-all-teams.component';
import { ViewTeamComponent } from './config/components/team/view-team/view-team.component';
import { SlideshowComponent } from './teams/components/slideshow/slideshow.component';
import { EditTeamComponent } from './config/components/setup/edit-team/edit-team.component';
import { ConfigureTeamLinksComponent } from './config/components/setup/configure-team-links/configure-team-links.component';
import { ConfigureMultimediaComponent } from './config/components/setup/configure-multimedia/configure-multimedia.component';
import { AuthComponent } from './auth/components/auth/auth.component';
import { SlideshowMultimediaComponent } from './teams/components/slideshow/slideshow-multimedia/slideshow-multimedia.component';

const routes: Routes = [
  { path: 'projects', component: ProjectDisplayComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'links', component: LinksComponent },
  { path: 'multimedia', component: MultimediaComponent },
/* 
  { path: 'setup', component: SetupComponent }, */

  
  
  { path: 'slideshow', component: SlideshowComponent },
  { path: 'slideshow-multimedia', component: SlideshowMultimediaComponent},
  { path: 'config', component: ConfigComponent 
      , children : [
        { path : 'setup', component : SetupComponent,
          children : [
            { path: 'editTeam' , component: EditTeamComponent },
            { path: 'configure-links' , component: ConfigureTeamLinksComponent },
            { path: 'configure-multimedia' , component: ConfigureMultimediaComponent },
            { path: 'view-members' , component: ViewAllTeamMembersComponent },
          ]
      },
      { path: 'team', component: TeamComponent ,
        children :[
          { path: 'viewAllTeams', component: ViewAllTeamsComponent },
        ]
      },
      ]},
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'login', component: AuthComponent },
  { path: 'addTeam', component: AddTeamComponent },
  
  { path: 'viewTeam', component: ViewTeamComponent },
  
  /* { path: 'editTeam' , component: EditTeamComponent }, */
  { path: 'viewAllTeamMembers', component: ViewAllTeamMembersComponent },
  
 
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgxEchartsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
