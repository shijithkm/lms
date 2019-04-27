import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FirebaseService } from './firebase.firebaseService';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { environment } from '../../../environments/environment';
import { Book } from 'src/app/models/book.model';

describe('FirebaseService', () => {

  let firebaseService: FirebaseService;
  let httpMoke: HttpTestingController;


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        HttpClientTestingModule
      ],
      providers: [
        FirebaseService
      ]
    });

    firebaseService = TestBed.get(FirebaseService);
    httpMoke = TestBed.get(HttpTestingController);

  });

  it('should be created firebase firebaseService', inject([FirebaseService], (firebaseService: FirebaseService) => {
    expect(firebaseService).toBeTruthy();
  }));

  it('should be created getBooks method', inject([FirebaseService], (firebaseService: FirebaseService) => {
    expect(firebaseService.getBooks).toBeTruthy();
  }));

  it('should return books from getBooks API via GET', inject([FirebaseService], (firebaseService: FirebaseService) => {
    const dummyBooks: Book[] = [{
      category: 'Story',
      description: 'desc updated',
      image: 'Image Path',
      isbn: '1001',
      key: '-LZzU3n_TUHqnsPr64wi',
      title: 'title updated'
    }];

    firebaseService.getBooks().subscribe(books => {
      expect(books.length).toBe(1);
      expect(books).toBe(this.dummyBooks);
    });
  }));

  it('should be created addBook method', inject([FirebaseService], (firebaseService: FirebaseService) => {
    expect(firebaseService.addBook).toBeTruthy();
  }));

  it('should be created updateBook method', inject([FirebaseService], (firebaseService: FirebaseService) => {
    expect(firebaseService.updateBook).toBeTruthy();
  }));

  it('should be created deleteBook method', inject([FirebaseService], (firebaseService: FirebaseService) => {
    expect(firebaseService.deleteBook).toBeTruthy();
  }));

});
