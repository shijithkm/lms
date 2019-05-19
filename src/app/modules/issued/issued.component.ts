import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ListDataSource } from './list-datasource';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/shared/services/global.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-issued',
  templateUrl: './issued.component.html',
  styleUrls: ['./issued.component.scss']
})
export class IssuedComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['action', 'title', 'smallThumbnail', 'issuedDate', 'returnedDate'];
  issedBooks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private router: Router,
    private globalService: GlobalService,
    private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.listIssuedBooks();
    this.dashboardService.title = this.route.snapshot.data.title;
  }

  listIssuedBooks() {
    this.firebaseService.getMyIssuedBooks()
      .subscribe((data) => {
        console.log(data);
        this.dataSource = new ListDataSource(this.paginator, this.sort, data);
      });
  }
  renewBook(row: Book) {
    this.firebaseService.renewBook(row)
      .then(r => { this.globalService.openSnackBar('Book has been returned succssfully!', 'OK'); })
      .catch(e => { this.globalService.openSnackBar('Error, Please try after sometime!', 'OK'); });
  }

  returnBook(row: Book) {
    this.firebaseService.returnBook(row)
      .then(r => { this.globalService.openSnackBar('Book has been returned succssfully!', 'OK'); })
      .catch(e => { this.globalService.openSnackBar('Error, Please try after sometime!', 'OK'); });
  }

}

