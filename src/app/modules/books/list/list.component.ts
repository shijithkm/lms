import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ListDataSource } from './list-datasource';
import { DataSource } from '@angular/cdk/table';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['action', 'isbn', 'title', 'author', 'rating', 'smallThumbnail', 'categories'];

  constructor(
    private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.dataSource = new ListDataSource(this.paginator, this.sort, this.firebaseService);
  }
}
