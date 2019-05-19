import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { ListDataSource } from '../books/list/list-datasource';
import { DashboardService } from './dashboard.service';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books;

  constructor(
    public firebaseService: FirebaseService,
    public dashboardService: DashboardService,
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    this.listBooks();
    this.getCart();
    this.getFavorites();
  }

  listBooks() {
    this.firebaseService.getBooks()
      .subscribe((books) => {
        this.books = books;
      });
  }

  addToCart(book) {
    this.firebaseService.addToCart(book)
      .then(r => { this.globalService.openSnackBar('Book has been added to cart succssfully!', 'OK'); })
      .catch(e => { this.globalService.openSnackBar('Error, Please try after sometime!', 'OK'); });
  }

  getCart() {
    this.firebaseService.getCart()
      .subscribe(r => { this.dashboardService.cart = r; })
  }

  getFavorites() {
    this.firebaseService.getMyFavorites()
      .subscribe(r => { this.dashboardService.myFavorites = r; })
  }

  addToMyFavorites(book) {
    this.firebaseService.addToFavorite(book)
      .then(r => { this.globalService.openSnackBar('Book has been added to my favorites succssfully!', 'OK'); })
      .catch(e => { this.globalService.openSnackBar('Error, Please try after sometime!', 'OK'); });
  }

  removeMyFavorites(book) {
    this.firebaseService.removeMyFavorites(book)
      .then(r => { this.globalService.openSnackBar('Book has been removed from favorites succssfully!', 'OK'); })
      .catch(e => { this.globalService.openSnackBar('Error, Please try after sometime!', 'OK'); });
  }

}
