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
    if (localStorage.currentUser) {
      this.userId = JSON.parse(localStorage.currentUser).id;
    }
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

  async updateBookAvailable(key: string, book: Book) {

    this.booksList.query
      .orderByChild('isbn')
      .equalTo(book.isbn)
      .once('value', (snapshot) => {
        const result: any = Object.values(snapshot.val());
        const availableBooks = result[0].availableBooks - 1;
        this.booksList.update(key, {
          availableBooks
        });
      });
  }

  returnBook(book: Book) {

    // Update Available Books
    this.booksList.query
      .orderByChild('isbn')
      .equalTo(book.isbn)
      .once('value', (snapshot) => {
        const result: any = Object.values(snapshot.val());
        const availableBooks = result[0].availableBooks + 1;
        this.booksList.update(book.bookId, {
          availableBooks
        });
      });

    return this.issued.update(book.key, {
      status: 'RETURNED'
    });

  }

  renewBook(book: Book) {
    return this.issued.update(book.key, {
      status: 'RENEWED',
      returnedDate: new Date(new Date().setDate(new Date().getDate() + this.returnedDays)).toDateString()
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
    const data: any = {};
    data.title = book.title;
    data.thumbnail = book.thumbnail;
    data.smallThumbnail = book.smallThumbnail;
    data.isbn = book.isbn;
    data.categories = book.categories;
    data.author = book.author;
    data.userId = this.userId;
    data.bookId = book.key;
    data.userIdKey = this.userId + '_' + book.key;
    return this.cart.push(data);
  }

  removeFromCart(key: string) {
    return this.cart.remove(key);
  }

  isBookAddedToCart(userIdKey: string) {
    this.cart.query.orderByChild('userIdKey').equalTo(userIdKey).on('value', (snapshot) => {
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
    book.userIdKey = this.userId + '_' + book.key;
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
    const userIdKey = this.userId + '_' + book.key;
    return this.favorites.query.orderByChild('userIdKey')
      .equalTo(userIdKey)
      .once('value', (snapshot) => {
        const keys = Object.keys(snapshot.val());
        const key = keys[0];
        return this.favorites.remove(key);
      });
  }

  /** ISSUED */

  addToIssued(books: Book[]) {
    return new Promise((resolve, reject) => {
      books.forEach(e => {
        const data: any = {};
        data.title = e.title;
        data.thumbnail = e.thumbnail;
        data.smallThumbnail = e.smallThumbnail;
        data.isbn = e.isbn;
        data.categories = e.categories;
        data.author = e.author;
        data.userId = e.userId;
        data.bookId = e.bookId;
        data.userIdKey = e.userIdKey;
        data.status = 'ISSUED';
        data.issuedDate = new Date().toDateString();
        data.returnedDate = new Date(new Date().setDate(new Date().getDate() + this.returnedDays)).toDateString();

        this.issued.push(data);

      });

      resolve(true);

    });

  }


  getMyIssuedBooks() {
    return this.issued.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getAllIssuedBooks() {
    return this.issued.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
}
