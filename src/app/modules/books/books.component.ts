import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  bookCount: number;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {

    this.bookCount = 0;

    this.firebaseService.getBooks()
      .subscribe((data) => {
        this.bookCount = data.length;
      });
  }

}
