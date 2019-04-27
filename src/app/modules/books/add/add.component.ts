import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addBookForm: FormGroup;
  defaultThumbnail = '../../../../assets/images/thumbnail.jpg';

  constructor(
    private firebaseService: FirebaseService,
    public booksService: BooksService,
    private fb: FormBuilder,
    private globalService: GlobalService
  ) {

    this.addBookForm = this.fb.group({
      isbn: ['', Validators.required],
      title: [''],
      author: [''],
      rating: [''],
      thumbnail: [''],
      smallThumbnail: [this.defaultThumbnail],
      catogories: [''],
      description: ['']
    });
  }


  ngOnInit() {
  }

  getBookDetailsByIsbn(isbn: string) {
    if (!isbn) { return false; }
    this.booksService.getBookDetailsByIsbn(isbn)
      .subscribe(book => {
        this.addBookForm.patchValue({
          title: book.items[0].volumeInfo.title,
          author: book.items[0].volumeInfo.authors[0],
          rating: (book.items[0].volumeInfo.averageRating) ? book.items[0].volumeInfo.averageRating : 0,
          smallThumbnail: book.items[0].volumeInfo.imageLinks.smallThumbnail,
          thumbnail: book.items[0].volumeInfo.imageLinks.thumbnail,
          catogories: book.items[0].volumeInfo.categories[0],
          description: book.items[0].volumeInfo.description,
        });
      });
  }

  saveBook() {

    this.firebaseService.addBook(this.addBookForm.value)
      .then(e => {
        this.globalService.openSnackBar('Book has been added succfully!', 'OK');
        this.addBookForm.reset();
        this.addBookForm.patchValue({ smallThumbnail: this.defaultThumbnail });
      })
      .catch(e => {
        this.globalService.openSnackBar('Error, Please try after sometime!', 'OK');
      })
  }

}
