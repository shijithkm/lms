import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AccessDeniedRoutingModule } from './access-denied-routing.module';
import { AccessDeniedComponent } from './access-denied.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AccessDeniedComponent],
  imports: [
    CommonModule,
    AccessDeniedRoutingModule,
    SharedModule
  ]
})
export class AccessDeniedModule { }
