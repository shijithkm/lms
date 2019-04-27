import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'list', component: ListComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit', component: AddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
