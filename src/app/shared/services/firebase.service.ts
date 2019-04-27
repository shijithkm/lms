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

  constructor(private db: AngularFireDatabase, private http: HttpClient) {
    this.booksList = this.db.list('books');
    this.usersList = this.db.list('users');
  }
  public getBooks() {
    return this.booksList.snapshotChanges();
  }
  addBook(book: Book) {
    return this.booksList.push(book);
  }
  updateBook(key: string) {
    this.booksList.update(key, {
      title: 'title updated',
      description: 'desc updated'
    });
  }
  deleteBook(key: string) {
    this.booksList.remove(key);
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




}
