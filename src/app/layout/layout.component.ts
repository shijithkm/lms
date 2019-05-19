import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DashboardService } from '../modules/dashboard/dashboard.service';
import { GlobalService } from '../shared/services/global.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  title: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    public dashboardService: DashboardService,
    public globalService: GlobalService
  ) {

  }

  ngOnInit() {
 
  }

}
