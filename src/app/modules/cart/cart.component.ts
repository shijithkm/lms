
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ListDataSource } from './list-datasource';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/shared/services/global.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['action', 'isbn', 'title', 'author', 'rating', 'smallThumbnail', 'categories', 'noOfBooks'];
  issedBooks: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private globalService: GlobalService,
    private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.listBooks();
  }

  listBooks() {
    this.firebaseService.getCart()
      .subscribe((data) => {
        this.dataSource = new ListDataSource(this.paginator, this.sort, data);
      });
  }

  deleteBook(book: Book) {
    // this.firebaseService.deleteBook(key)
    //   .then(e => {
    //     this.globalService.openSnackBar('Book has been deleted succssfully!', 'OK');
    //   })
    //   .catch(e => {
    //     this.globalService.openSnackBar('Error, Please try after sometime!', 'OK');
    //   });

    this.dashboardService.removeFromCart(book);
    this.listBooks();

  }

  issueBooks() {
    this.issedBooks.push(this.dashboardService.cart);
    this.dashboardService.cart = [];
    this.listBooks();
    this.router.navigate(['/']);
  }


}

