export interface Book {
  userIdKey: string;
  key: string;
  bookId: string;
  userId: string;
  isbn: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  thumbnail: string;
  smallThumbnail: string;
  categories: string[];
  noOfBooks: number;
  availableBooks: number;
  issuedDate: string;
  returnedDate: string;
  location: string;
  status: string;
}
