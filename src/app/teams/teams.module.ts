   
import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientSatisfactionComponent } from './components/dashboard/client-satisfaction/client-satisfaction.component';
import { CodeQualityComponent } from './components/dashboard/code-quality/code-quality.component';
import { TeamSpiritComponent } from './components/dashboard/team-spirit/team-spirit.component';
import { BurndownComponent } from './components/dashboard/burndown/burndown.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { VelocityComparsionComponent } from './components/dashboard/velocity-comparsion/velocity-comparsion.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxElectronModule } from 'ngx-electron';
import { LinksComponent } from './components/links/links.component';
import { MultimediaComponent } from './components/multimedia/multimedia.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { ProjectsComponent } from './components/project-display/projects/projects.component';
import { MyProjectsComponent } from './components/project-display/my-projects/my-projects.component';
import { ProjectDisplayComponent } from './components/project-display/project-display.component';
import {
  BurndownResponse,
  ClientStatusResponse,
  CodeQualityResponse,
  Dashboard,
  SprintDetailResponse,
  TeamSpiritResponse,
  VelocityResponse,
} from '../shared/model/general.model';
import { SlideshowMultimediaComponent } from './components/slideshow/slideshow-multimedia/slideshow-multimedia.component';
import { RouterModule, Routes } from '@angular/router';
import { ShortURLPipe } from './pipes/short-url.pipe';

const routes: Routes = [
  { path: '', component: ProjectDisplayComponent },
  { path: 'projects', component: ProjectDisplayComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'links', component: LinksComponent },
  { path: 'multimedia', component: MultimediaComponent },
  { path: 'slideshow', component: SlideshowComponent },
  { path: 'slideshow-multimedia', component: SlideshowMultimediaComponent}
];
@NgModule({
  declarations: [
    DashboardComponent,
    LinksComponent,
    ClientSatisfactionComponent,
    CodeQualityComponent,
    TeamSpiritComponent,
    BurndownComponent,
    VelocityComparsionComponent,
    MultimediaComponent,
    SlideshowComponent,
    ProjectsComponent,
    MyProjectsComponent,
    ProjectDisplayComponent,
    SlideshowMultimediaComponent,
    ShortURLPipe,
  ],
  providers: [
    Dashboard,
    CodeQualityResponse,
    ClientStatusResponse,
    TeamSpiritResponse,
    BurndownResponse,
    VelocityResponse,
    SprintDetailResponse,
  ],
  imports: [
    CommonModule,
    NgxEchartsModule,
    NgxElectronModule,
    VgCoreModule,
    VgControlsModule,
    VgBufferingModule,
    RouterModule,
    RouterModule.forChild(routes) 
  ],
  exports: [
    DashboardComponent,
    LinksComponent,
    SlideshowComponent,
    MyProjectsComponent,
    ProjectDisplayComponent,
    ProjectsComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class TeamsModule {}