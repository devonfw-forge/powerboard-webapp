import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardComponent } from './teams/components/dashboard/dashboard.component';
import { LinksComponent } from './teams/components/links/links.component';
import { AuthComponent } from './auth/components/auth/auth.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { MultimediaComponent } from './teams/components/multimedia/multimedia.component';

import { ProjectDisplayComponent } from './teams/components/project-display/project-display.component';
import { AddGuestComponent } from './config/components/guest/add-guest/add-guest.component';
import { GuestComponent } from './config/components/guest/guest.component';
import { ViewAllGuestsComponent } from './config/components/guest/view-all-guests/view-all-guests.component';

import { ConfigComponent } from './config/components/config/config.component';
import { ConfigureImagesComponent } from './config/components/setup/configure-images/configure-images.component';
import { ConfigureLogoComponent } from './config/components/setup/configure-logo/configure-logo.component';
import { ConfigureTeamLinksComponent } from './config/components/setup/configure-team-links/configure-team-links.component';
import { ConfigureTeamSpiritComponent } from './config/components/setup/configure-team-spirit/configure-team-spirit.component';
import { ConfigureVideosComponent } from './config/components/setup/configure-videos/configure-videos.component';
import { SetupComponent } from './config/components/setup/setup.component';
import { TeamComponent } from './config/components/team/team.component';
import { ViewAllTeamMembersComponent } from './config/components/team/view-all-team-members/view-all-team-members.component';
import { AddTeamComponent } from './config/components/team/view-all-teams/add-team/add-team.component';
import { ViewAllTeamsComponent } from './config/components/team/view-all-teams/view-all-teams.component';
import { ViewTeamComponent } from './config/components/team/view-team/view-team.component';
import { SlideshowComponent } from './teams/components/slideshow/slideshow.component';

const routes: Routes = [
  { path: 'projects', component: ProjectDisplayComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'links', component: LinksComponent },
  { path: 'multimedia', component: MultimediaComponent },

  { path: 'setup', component: SetupComponent },
  { path: 'configure-logo', component: ConfigureLogoComponent },

  { path: 'configure-team-links', component: ConfigureTeamLinksComponent },
  { path: 'configure-images', component: ConfigureImagesComponent },
  { path: 'configure-videos', component: ConfigureVideosComponent },

  { path: 'slideshow', component: SlideshowComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'login', component: AuthComponent },
  { path: 'addTeam', component: AddTeamComponent },
  { path: 'team', component: TeamComponent },
  { path: 'viewTeam', component: ViewTeamComponent },
  { path: 'viewAllTeams', component: ViewAllTeamsComponent },

  { path: 'viewAllTeamMembers', component: ViewAllTeamMembersComponent },
  { path: 'guest', component: GuestComponent },
  { path: 'addGuest', component: AddGuestComponent },
  { path: 'viewAllGuests', component: ViewAllGuestsComponent },
  { path: 'sendToTeamSpirit', component: ConfigureTeamSpiritComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgxEchartsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
