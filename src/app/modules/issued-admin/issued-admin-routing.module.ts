import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssuedAdminComponent } from './issued-admin.component';

const routes: Routes = [
  { path: '', component: IssuedAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuedAdminRoutingModule { }
