import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { ListDataSource } from '../books/list/list-datasource';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books;

  constructor(
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.listBooks();
  }

  listBooks() {
    this.firebaseService.getBooks()
      .subscribe((books) => {
        this.books = books;
      });
  }


}
