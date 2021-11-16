import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxElectronModule } from 'ngx-electron';
import { ConfigModule } from './config/config.module';
import { TeamsModule } from './teams/teams.module';
import { SharedModule } from './shared/shared.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ToastrModule } from 'ngx-toastr';


/* import { NgxEchartsModule } from 'ngx-echarts/lib/ngx-echarts.module'; */

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AuthModule,
    ReactiveFormsModule,
    FormsModule,
    ConfigModule,
    TeamsModule,
    SharedModule,
    NgxFileDropModule,
    ToastrModule.forRoot({ timeOut: 3000, progressBar: true }),
    NgxElectronModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),

    /* NgxEchartsModule */
  ],
  providers: [Location],
  bootstrap: [AppComponent],
})
export class AppModule {}
