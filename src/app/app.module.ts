import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    LayoutModule,
    BrowserAnimationsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
