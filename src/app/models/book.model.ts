export interface Book {
  userId_key: string;
  key: string;
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
}
