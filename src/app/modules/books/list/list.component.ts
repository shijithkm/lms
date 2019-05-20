import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ListDataSource } from './list-datasource';
import { DataSource } from '@angular/cdk/table';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { BooksService } from '../books.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: ListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['action', 'isbn', 'title', 'author', 'rating', 'smallThumbnail', 'categories', 'noOfBooks', 'location'];

  constructor(
    private bookService: BooksService,
    private router: Router,
    private globalService: GlobalService,
    private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.listBooks();
  }

  listBooks() {
    this.firebaseService.getBooks()
      .subscribe((data) => {
        this.dataSource = new ListDataSource(this.paginator, this.sort, data);
      });
  }

  editBook(row) {
    this.bookService.book = row;
    this.router.navigate(['/admin/books/edit/', row.key]);
  }

  deleteBook(key: string) {
    this.firebaseService.deleteBook(key)
      .then(e => {
        this.globalService.openSnackBar('Book has been deleted succssfully!', 'OK');
      })
      .catch(e => {
        this.globalService.openSnackBar('Error, Please try after sometime!', 'OK');
      });
  }

}
