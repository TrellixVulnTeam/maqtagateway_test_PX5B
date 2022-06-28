import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    DashboardComponent,
    
  ],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule
  ],
  exports:[
    DashboardComponent
  ],
  providers:[
    HttpClientModule
  ]
})
export class DashbordModule { }
