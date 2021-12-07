import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxElectronModule } from 'ngx-electron';
import { LinksComponent } from '../components/links/links.component';

const routes: Routes = [
    { path: '', component: LinksComponent }
  ];
  
  @NgModule({
    declarations: [
  
      LinksComponent
    ],
    imports: [
      CommonModule,
      NgxElectronModule,
      RouterModule.forChild(routes) 
    ],
    exports:[
      LinksComponent
    ],
  schemas:[NO_ERRORS_SCHEMA]
  })
  export class LinksModule { }
  