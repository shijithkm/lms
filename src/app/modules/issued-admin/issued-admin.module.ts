import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuedAdminRoutingModule } from './issued-admin-routing.module';
import { IssuedAdminComponent } from './issued-admin.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [IssuedAdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    IssuedAdminRoutingModule
  ]
})
export class IssuedAdminModule { }
