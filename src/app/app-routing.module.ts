import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'dashboard'
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Guarding child routes
    data: {
      allowedRoles: ['user'],
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        data: {
          allowedRoles: ['user', 'admin'],
        },

      }
    ]
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Guarding child routes
    data: {
      allowedRoles: ['admin', 'user'],
    },
    children: [
      {
        path: 'books',
        loadChildren: './modules/books/books.module#BooksModule',
      },
      {
        path: 'users',
        loadChildren: './modules/books/books.module#BooksModule',
      }
    ]
  },
  {
    path: 'accessdenied', loadChildren: './modules/access-denied/access-denied.module#AccessDeniedModule'
  },
  {
    path: '**', loadChildren: './modules/page-not-found/page-not-found.module#PageNotFoundModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
