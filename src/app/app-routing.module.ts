import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'search'
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
        path: 'search',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        data: {
          allowedRoles: ['user', 'admin'],
        },

      },
      {
        path: 'cart',
        loadChildren: './modules/cart/cart.module#CartModule',
        data: {
          allowedRoles: ['user', 'admin'],
        },
      },
      {
        path: 'issued',
        loadChildren: './modules/issued/issued.module#IssuedModule',
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
