import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  cart: any[] = [];
  myFavorites: any[] = [];

  constructor() { }

  addToCart(book) {
    this.cart.push(book);
  }

  removeFromCart(book) {
    const index = this.cart.indexOf(book);
    this.cart.splice(index, 1);
  }

  isBookAddedToCart(book) {
    return this.cart.includes(book);
  }

  addToMyFavorites(book) {
    this.myFavorites.push(book);
  }

  removeMyFavorites(book) {
    const index = this.myFavorites.indexOf(book);
    this.myFavorites.splice(index, 1);
  }


  isBookAddedToMyFavorites(book) {
    return this.myFavorites.includes(book);
  }
}
