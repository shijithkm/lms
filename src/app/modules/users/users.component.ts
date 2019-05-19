import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
  ) { }

  ngOnInit() {
    this.dashboardService.title = this.route.snapshot.data.title;
  }

}
