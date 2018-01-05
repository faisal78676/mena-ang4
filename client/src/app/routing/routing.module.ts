import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule} from '@angular/router';
import {HomeComponent } from '../component/home/home.component';
import {DashboardComponent } from '../component/dashboard/dashboard.component';
import {RegisterComponent }from '../component/register/register.component';
const appRoutes :Routes=[
  {
    path:'',
    component:HomeComponent 
  },
  {
    path:'dashboard',
    component:DashboardComponent 
  },
  {
    path:'register',
    component:RegisterComponent
  }
  ,{path:'**',component:HomeComponent }
]
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports:[RouterModule],
  providers:[]
})
export class RoutingModule { }
