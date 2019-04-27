import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from 'src/app/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  book: Book;

  constructor(private httpClient: HttpClient) { }

  public getBookDetailsByIsbn(isbn: string): Observable<any> {
    const q = `?q=isbn:${isbn}`;
    return this.httpClient.get(env.googleBookAPI + q);
  }



}
