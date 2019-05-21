import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ListDataSource } from './list-datasource';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/shared/services/global.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-issued-admin',
  templateUrl: './issued-admin.component.html',
  styleUrls: ['./issued-admin.component.scss']
})
export class IssuedAdminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: ListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'smallThumbnail', 'author', 'userId', 'issuedDate', 'returnedDate', 'status'];
  issedBooks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private router: Router,
    private globalService: GlobalService,
    public firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.listIssuedBooks();
    this.dashboardService.title = this.route.snapshot.data.title;
  }

  listIssuedBooks() {
    this.firebaseService.getAllIssuedBooks()
      .subscribe((data) => {
        console.log(data);
        this.dataSource = new ListDataSource(this.paginator, this.sort, data);
      });
  }
}

