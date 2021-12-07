import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { ViewTeamComponent } from './config/components/team/view-team/view-team.component';
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
