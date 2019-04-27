import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './shared/services/firebase.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lms-app';
  books: any[];

  constructor(private fb: FirebaseService) { }

  ngOnInit() {

  }

}
