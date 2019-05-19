import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { Book } from 'src/app/models/book.model';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  booksList: AngularFireList<any>;
  usersList: AngularFireList<any>;
  favorites: AngularFireList<any>;
  issued: AngularFireList<any>;
  cart: AngularFireList<any>;
  userId: string;
  returnedDays: number;

  constructor(private db: AngularFireDatabase, private http: HttpClient) {
    this.booksList = this.db.list('books');
    this.usersList = this.db.list('users');
    this.favorites = this.db.list('favorites');
    this.issued = this.db.list('issued');
    this.cart = this.db.list('cart');
    this.userId = JSON.parse(localStorage.currentUser).id;
    this.returnedDays = 5;
  }
  public getBooks() {
    return this.booksList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  addBook(book: Book) {
    book.availableBooks = book.noOfBooks;
    return this.booksList.push(book);
  }

  updateBook(key: string, book: Book) {
    return this.booksList.update(key, {
      title: book.title,
      description: book.description,
      categories: book.categories,
      noOfBooks: book.noOfBooks,
      author: book.author,
      location: book.location,
    });

  }

  updateBookAvailable(key: string, book: Book) {
    const availableBooks = book.availableBooks === null ? book.availableBooks : book.noOfBooks - 1;
    return this.booksList.update(key, {
      availableBooks
    });
  }

  deleteBook(key: string) {
    return this.booksList.remove(key);
  }
  // 9781451648546
  SearchByISBN(isbn) {
    const encodedURI = encodeURI('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '&maxResults=1');
    return this.http.get(encodedURI).subscribe((result) => {
      console.log(result);
    });
  }

  addUser(user: User) {
    // check user already exists and add
    this.usersList.query.orderByChild('id').equalTo(user.id).on('value', (snapshot) => {
      if (snapshot.val() === null) {
        this.usersList.push(user);
      }
    });

  }

  getUser(id: string) {
    return this.usersList.query.orderByChild('id').equalTo(id);
  }

  /**
   *  Cart
   */

  addToCart(book: Book) {
    book.userId = this.userId;
    book.userId_key = this.userId + '_' + book.key;
    return this.cart.push(book);
  }

  isBookAddedToCart(key: string) {
    this.cart.query.orderByChild('key').equalTo(key).on('value', (snapshot) => {
      if (snapshot.val() === null) {
        return false;
      } else {
        return true;
      }
    });
  }

  public getCart() {
    return this.cart.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }


  clearMyCart() {
    return this.cart.query
      .orderByChild('userId')
      .equalTo(this.userId)
      .once('value', (snapshot) => {
        const keys = Object.keys(snapshot.val());
        console.log(keys);
        keys.forEach(key => {
          return this.cart.remove(key);
        });
      });
  }


  /**
   * Favorite
   */
  addToFavorite(book: Book) {
    book.userId = this.userId;
    book.userId_key = this.userId + '_' + book.key;
    return this.favorites.push(book);
  }

  getMyFavorites() {
    return this.favorites.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  removeMyFavorites(book: Book) {
    const userId_key = this.userId + '_' + book.key;
    return this.favorites.query.orderByChild('userId_key')
      .equalTo(userId_key)
      .once('value', (snapshot) => {
        const keys = Object.keys(snapshot.val());
        const key = keys[0];
        return this.favorites.remove(key);
      });
  }

  /**
  * Issued
  */

  addToIssued(books: Book[]) {
    const issuedBooks: Book[] = [];
    books.forEach(e => {
      e.userId = this.userId;
      e.userId_key = this.userId + '_' + e.key;
      e.issuedDate = new Date().toDateString();
      e.returnedDate = new Date(new Date().setDate(new Date().getDate() + 5)).toDateString();
      this.issued.push(e);
    });
    return this.issued.push(issuedBooks);
  }


  getMyIssuedBooks() {
    return this.issued.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
}
