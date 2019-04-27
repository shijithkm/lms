import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

// TODO: Replace this with your own data model type
export interface ListItem {
  title: string;
  author: string;
  description: string;
  rating: number;
  thumbnail: string;
  smallThumbnail: string;
  categories: string[],
  isbn: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ListItem[] = [
  {
    title: 'Goat Days',
    author: 'Benyamin',
    // tslint:disable-next-line: max-line-length
    description: 'Najeeb’s dearest wish is to work in the Gulf and earn enough money to send back home. He achieves his dream only to be propelled by a series of incidents, grim and absurd, into a slave-like existence herding goats in the middle of the Saudi desert. Memories of the lush, verdant landscape of his village and of his loving family haunt Najeeb whose only solace is the companionship of goats. In the end, the lonely young man contrives a hazardous scheme to escape his desert prison. Goat Days was published to acclaim in Malayalam and became a bestseller. One of the brilliant new talents of Malayalam literature, Benyamin’s wry and tender telling transforms this strange and bitter comedy of Najeeb’s life in the desert into a universal tale of loneliness and alienation.',
    rating: 3.5,
    thumbnail: 'http://books.google.com/books/content?id=7alOQXMCx6cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    smallThumbnail: 'http://books.google.com/books/content?id=7alOQXMCx6cC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    categories: ['Fiction'],
    isbn: '9788184756654'
  },
  {
    title: 'Goat Days',
    author: 'Benyamin',
    // tslint:disable-next-line: max-line-length
    description: 'Najeeb’s dearest wish is to work in the Gulf and earn enough money to send back home. He achieves his dream only to be propelled by a series of incidents, grim and absurd, into a slave-like existence herding goats in the middle of the Saudi desert. Memories of the lush, verdant landscape of his village and of his loving family haunt Najeeb whose only solace is the companionship of goats. In the end, the lonely young man contrives a hazardous scheme to escape his desert prison. Goat Days was published to acclaim in Malayalam and became a bestseller. One of the brilliant new talents of Malayalam literature, Benyamin’s wry and tender telling transforms this strange and bitter comedy of Najeeb’s life in the desert into a universal tale of loneliness and alienation.',
    rating: 5,
    thumbnail: 'http://books.google.com/books/content?id=7alOQXMCx6cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    smallThumbnail: 'http://books.google.com/books/content?id=7alOQXMCx6cC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    categories: ['Fiction'],
    isbn: '9788184756654'
  },
  {
    title: 'Goat Days',
    author: 'Benyamin',
    // tslint:disable-next-line: max-line-length
    description: 'Najeeb’s dearest wish is to work in the Gulf and earn enough money to send back home. He achieves his dream only to be propelled by a series of incidents, grim and absurd, into a slave-like existence herding goats in the middle of the Saudi desert. Memories of the lush, verdant landscape of his village and of his loving family haunt Najeeb whose only solace is the companionship of goats. In the end, the lonely young man contrives a hazardous scheme to escape his desert prison. Goat Days was published to acclaim in Malayalam and became a bestseller. One of the brilliant new talents of Malayalam literature, Benyamin’s wry and tender telling transforms this strange and bitter comedy of Najeeb’s life in the desert into a universal tale of loneliness and alienation.',
    rating: 1,
    thumbnail: 'http://books.google.com/books/content?id=7alOQXMCx6cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    smallThumbnail: 'http://books.google.com/books/content?id=7alOQXMCx6cC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    categories: ['Fiction'],
    isbn: '9788184756654'
  },
  {
    title: 'Goat Days',
    author: 'Benyamin',
    // tslint:disable-next-line: max-line-length
    description: 'Najeeb’s dearest wish is to work in the Gulf and earn enough money to send back home. He achieves his dream only to be propelled by a series of incidents, grim and absurd, into a slave-like existence herding goats in the middle of the Saudi desert. Memories of the lush, verdant landscape of his village and of his loving family haunt Najeeb whose only solace is the companionship of goats. In the end, the lonely young man contrives a hazardous scheme to escape his desert prison. Goat Days was published to acclaim in Malayalam and became a bestseller. One of the brilliant new talents of Malayalam literature, Benyamin’s wry and tender telling transforms this strange and bitter comedy of Najeeb’s life in the desert into a universal tale of loneliness and alienation.',
    rating: 3,
    thumbnail: 'http://books.google.com/books/content?id=7alOQXMCx6cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    smallThumbnail: 'http://books.google.com/books/content?id=7alOQXMCx6cC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    categories: ['Fiction'],
    isbn: '9788184756654'
  },
  {
    title: 'Goat Days',
    author: 'Benyamin',
    // tslint:disable-next-line: max-line-length
    description: 'Najeeb’s dearest wish is to work in the Gulf and earn enough money to send back home. He achieves his dream only to be propelled by a series of incidents, grim and absurd, into a slave-like existence herding goats in the middle of the Saudi desert. Memories of the lush, verdant landscape of his village and of his loving family haunt Najeeb whose only solace is the companionship of goats. In the end, the lonely young man contrives a hazardous scheme to escape his desert prison. Goat Days was published to acclaim in Malayalam and became a bestseller. One of the brilliant new talents of Malayalam literature, Benyamin’s wry and tender telling transforms this strange and bitter comedy of Najeeb’s life in the desert into a universal tale of loneliness and alienation.',
    rating: 4,
    thumbnail: 'http://books.google.com/books/content?id=7alOQXMCx6cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    smallThumbnail: 'http://books.google.com/books/content?id=7alOQXMCx6cC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    categories: ['Fiction'],
    isbn: '9788184756654'
  }
];

/**
 * Data source for the List view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListDataSource extends DataSource<Book> {
  data: Book[] = EXAMPLE_DATA;

  constructor(
    private paginator: MatPaginator,
    private sort: MatSort,
    private firebaseService: FirebaseService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ListItem[]> {
    this.getBooks();
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.


    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ListItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'isbn': return compare(+a.isbn, +b.isbn, isAsc);
        default: return 0;
      }
    });
  }


  getBooks() {
    this.firebaseService.getBooks().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
