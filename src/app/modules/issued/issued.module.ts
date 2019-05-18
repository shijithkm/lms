import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuedRoutingModule } from './issued-routing.module';
import { IssuedComponent } from './issued.component';

@NgModule({
  declarations: [IssuedComponent],
  imports: [
    CommonModule,
    IssuedRoutingModule
  ]
})
export class IssuedModule { }
