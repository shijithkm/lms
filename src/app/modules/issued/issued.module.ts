import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuedRoutingModule } from './issued-routing.module';
import { IssuedComponent } from './issued.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [IssuedComponent],
  imports: [
    CommonModule,
    IssuedRoutingModule,
    SharedModule
  ]
})
export class IssuedModule { }
