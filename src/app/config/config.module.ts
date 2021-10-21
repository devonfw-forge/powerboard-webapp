import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from '../config/components/config/config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SetupComponent } from './components/setup/setup.component';
import { ConfigureTeamLinksComponent } from './components/setup/configure-team-links/configure-team-links.component';

import { ConfigureLogoComponent } from './components/setup/configure-logo/configure-logo.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxElectronModule } from 'ngx-electron';
import { TeamComponent } from './components/team/team.component';

import { ViewTeamComponent } from './components/team/view-team/view-team.component';
import { RouterModule } from '@angular/router';
import { ViewAllTeamsComponent } from './components/team/view-all-teams/view-all-teams.component';

import { ViewAllTeamMembersComponent } from './components/team/view-all-team-members/view-all-team-members.component';


import { EditTeamComponent } from './components/setup/edit-team/edit-team.component';
import { RemoveUnderscorePipe } from './model/config.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddMemberComponent } from './components/team/view-all-team-members/add-member/add-member.component';
import { ShortUrlPipe } from './pipes/short-url.pipe';
import { LinkTypeFilterPipe } from './pipes/link-type-filter.pipe';
import { AddLinksComponent } from './components/setup/configure-team-links/add-links/add-links.component';
import { AddTeamComponent } from './components/team/view-all-teams/add-team/add-team.component';
import { ADcenterFilterPipe } from './pipes/adcenter-filter.pipe';
import { ConfigureMultimediaComponent } from './components/setup/configure-multimedia/configure-multimedia.component';
import { EditTeamMemberComponent } from './components/team/view-all-team-members/edit-team-member/edit-team-member.component';

/* import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; */

/* import { FileDropModule } from 'ngx-file-drop'; */

@NgModule({
  declarations: [
    ConfigComponent,
    SetupComponent,

    ConfigureTeamLinksComponent,
  
    ConfigureLogoComponent,
    TeamComponent,
    AddTeamComponent,
    ViewTeamComponent,
    ViewAllTeamsComponent,
    ViewAllTeamMembersComponent,
    
    EditTeamComponent,
    RemoveUnderscorePipe,
    AddMemberComponent,
    ShortUrlPipe,
    LinkTypeFilterPipe,
    AddLinksComponent,
    ADcenterFilterPipe,
    ConfigureMultimediaComponent,
    EditTeamMemberComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    NgxElectronModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  exports: [ReactiveFormsModule, FormsModule, ConfigComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ConfigModule {}
