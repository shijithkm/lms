import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  bookCount: number;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private dashboardService: DashboardService,
  ) { }

  ngOnInit() {

    this.dashboardService.title = this.route.snapshot.data.title;

    this.bookCount = 0;

    this.firebaseService.getBooks()
      .subscribe((data) => {
        this.bookCount = data.length;
      });
  }

}
