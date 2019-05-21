import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  cart: any[] = [];
  myFavorites: any[] = [];
  userId: string;
  title: string;
  constructor() {
    if (localStorage.currentUser) {
      this.userId = JSON.parse(localStorage.currentUser).id;
    }
  }

  addToCart(book) {
    this.cart.push(book);
  }

  removeFromCart(book) {
    const index = this.cart.indexOf(book);
    this.cart.splice(index, 1);
  }

  isBookAddedToCart(book) {
    const userIdKey = this.userId + '_' + book.key;
    const result = this.cart.find(obj => {
      return obj.userIdKey === userIdKey;
    });
    return result;
  }

  addToMyFavorites(book) {
    this.myFavorites.push(book);
  }

  removeMyFavorites(book) {
    const index = this.myFavorites.indexOf(book);
    this.myFavorites.splice(index, 1);
  }

  isBookAddedToMyFavorites(book) {
    const result = this.myFavorites.find(obj => {
      const userId = localStorage.currentUser ? (JSON.parse(localStorage.currentUser).id) : null;
      return (obj.key === book.key && obj.userId === userId);
    });
    return result;
  }

}
