import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { DrillDownPageComponent } from './user/drill-down-page/drill-down-page.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [ {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
{path: 'auth', component: AuthComponent,
children: [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent
  },
]
},

{path: 'user/:id', component: UserComponent,
children: [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent },
  {path: 'drill-down', component: DrillDownPageComponent }
]
},
{ path: '**', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
