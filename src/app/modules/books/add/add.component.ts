import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addBookForm: FormGroup;
  defaultThumbnail = '../../../../assets/images/thumbnail.jpg';
  action: string;
  key: string;

  constructor(
    private firebaseService: FirebaseService,
    public booksService: BooksService,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private router: ActivatedRoute
  ) {

    this.key = this.router.snapshot.paramMap.get('key');
    this.action = (this.key) ? 'Edit' : 'Add';
    console.log('book', this.booksService.book);
    console.log('action', this.action);
    console.log('key', this.key);

    if (this.action === 'Add') {
      this.addBookForm = this.fb.group({
        isbn: ['', Validators.required],
        title: [''],
        author: [''],
        rating: [''],
        thumbnail: [''],
        smallThumbnail: [this.defaultThumbnail],
        categories: [''],
        description: [''],
        noOfBooks: [''],
        location: [''],
      });

    } else {
      this.addBookForm = this.fb.group({
        isbn: [{ value: this.booksService.book.isbn, disabled: true }, Validators.required],
        title: [this.booksService.book.title],
        author: [this.booksService.book.author],
        rating: [this.booksService.book.rating],
        thumbnail: [this.booksService.book.thumbnail],
        smallThumbnail: [this.booksService.book.smallThumbnail],
        categories: [this.booksService.book.categories],
        description: [this.booksService.book.description],
        noOfBooks: [this.booksService.book.noOfBooks],
        location: [this.booksService.book.location]
      });
    }

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
          categories: book.items[0].volumeInfo.categories[0],
          description: book.items[0].volumeInfo.description,
          location: book.items[0].volumeInfo.location,
          noOfBooks: 1, // Set Default Value
        });
      });
  }

  saveBook() {

    this.firebaseService.addBook(this.addBookForm.value)
      .then(e => {
        this.globalService.openSnackBar('Book has been added succssfully!', 'OK');
        this.addBookForm.reset();
        this.addBookForm.patchValue({ smallThumbnail: this.defaultThumbnail });
      })
      .catch(e => {
        this.globalService.openSnackBar('Error, Please try after sometime!', 'OK');
      });
  }

  updateBook() {

    this.firebaseService.updateBook(this.key, this.addBookForm.value)
      .then(e => {
        this.globalService.openSnackBar('Book has been updated succssfully!', 'OK');
        this.addBookForm.reset();
        this.addBookForm.patchValue({ smallThumbnail: this.defaultThumbnail });
      })
      .catch(e => {
        this.globalService.openSnackBar('Error, Please try after sometime!', 'OK');
      });
  }

}
