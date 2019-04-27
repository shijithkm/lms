import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { BooksService } from './books.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@NgModule({
  declarations: [BooksComponent, ListComponent, AddComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule
  ],
  providers: [BooksService, FirebaseService]
})
export class BooksModule { }
